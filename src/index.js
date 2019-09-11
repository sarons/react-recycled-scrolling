import React, {useState, useEffect, useRef} from 'react'
import PropTypes from 'prop-types'

import './styles.css'

RecycledList.propTypes = {
  attrList: PropTypes.array.isRequired,
  itemFn: PropTypes.func.isRequired,
  itemHeight: PropTypes.number,
  className: PropTypes.string,
  rowOffset: PropTypes.number
}

RecycledList.defaultProps = {
  attrList: [],
  itemHeight: 50,
  className: 'DefaultContainer',
  rowOffset: 6
}

export default function RecycledList({attrList, itemHeight, itemFn, className, rowOffset}) {
  const [scrollTop,setScrollTop] = useState(0)
  const [viewableHeight,setViewableHeight] = useState(0)
  const wrapper = useRef(null)
  const setScroll = e => setScrollTop(e.target.scrollTop)

  useEffect(()=> {
    if (wrapper.current) {
      setViewableHeight( parseFloat(window.getComputedStyle(wrapper.current).height) )    
    }
  },[])

  const itemStyle = (index) => ({
    height: itemHeight,
    top: itemHeight * index,
  })
  const listStyle = () => ({
    height: attrList.length * itemHeight,
    position: 'relative'
  })

  const inView = position => (position < viewableHeight + scrollTop + (rowOffset - 1) * itemHeight && 
    position > scrollTop - rowOffset * itemHeight)

  return(
    <div className={className} >
      <div className='Wrapper' ref={wrapper} onScroll={setScroll}>
        <div style={listStyle()} >
          {attrList.map(
            (attrs, index) => inView(index * itemHeight) &&
              (<div className='ItemWrapper' key={index} style={itemStyle(index, itemHeight)}>
                 {itemFn(attrs)}
               </div>)
            )
          }
        </div>
      </div>
    </div>
  )
}