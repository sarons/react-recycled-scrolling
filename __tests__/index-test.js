import '@testing-library/jest-dom/extend-expect'
import React from 'react'
import renderer from 'react-test-renderer'
import {render, fireEvent} from '@testing-library/react'
import RecycledList from '../src/index'

const renderWrapper = (numberList, itemHeight, extraRows, windowHeight, itemCount) =>{
  for (let i = 1; i <= itemCount; i++) numberList.push(i)
  jest.spyOn(window,'getComputedStyle').mockImplementation(() => ({height: windowHeight}))
  const result = render(
    <RecycledList
    itemFn={(item)=>(<>{item}</>)}
    attrList={numberList}
    itemHeight={itemHeight}
    rowOffset= {extraRows}
   />
  )
  return document.body.querySelector('.Wrapper').firstElementChild
}

describe('RecycledList', () => {
  it('should render', ()=>{
    const result = renderer.create(
      <RecycledList
      itemFn={jest.fn()}
      attrList={[]}
     />
    )
    expect(result).toMatchSnapshot()
  })

  it('should render items only to fill screen, not all items', ()=>{
    const numberList = [], itemHeight = 30, itemCount = 20000,
           extraRows = 10, windowHeight = 500
    const wrapper = renderWrapper(numberList, itemHeight, extraRows,
                                  windowHeight, itemCount)
    expect(wrapper.childElementCount).toBe(parseInt(windowHeight/itemHeight + extraRows))
  })

  it('should render all items when screen size > total renderable items', ()=>{
    const numberList = [], itemHeight = 30, itemCount = 20,
           extraRows = 10, windowHeight = 500
    const wrapper = renderWrapper(numberList, itemHeight, extraRows,
                                 windowHeight, itemCount)
    expect(wrapper.childElementCount).toBe(itemCount)
  })

  it('should remove items outside the view screen when scrolling down', ()=>{
    const numberList = [], itemHeight = 30, itemCount = 20000,
           extraRows = 10, windowHeight = 500
    const wrapper = renderWrapper(numberList, itemHeight, extraRows,
                                  windowHeight, itemCount)
    const firstElement = wrapper.firstElementChild.innerHTML
    fireEvent.scroll(wrapper,{target: {scrollTop: windowHeight + itemHeight*extraRows}})
    expect(wrapper.firstElementChild.innerHTML).not.toBe(firstElement)
    expect(parseInt(wrapper.firstElementChild.innerHTML)).toBeGreaterThan(extraRows)
  })

  it('should remove items outside the view screen when scrolling up', ()=>{
    const numberList = [], itemHeight = 30, itemCount = 20000,
           extraRows = 10, windowHeight = 500
    const wrapper = renderWrapper(numberList, itemHeight, extraRows,
                                  windowHeight, itemCount)
    fireEvent.scroll(wrapper,{target: {scrollTop: windowHeight + itemHeight*extraRows}})
    const firstElement = wrapper.firstElementChild.innerHTML
    fireEvent.scroll(wrapper,{target: {scrollTop: 0}})
    expect(wrapper.firstElementChild.innerHTML).not.toBe(firstElement)
    expect(parseInt(wrapper.firstElementChild.innerHTML)).toBe(1)
  })

  it('should be able to scroll to the last item without rendering all items', ()=>{
    const numberList = [], itemHeight = 30, itemCount = 20000,
           extraRows = 10, windowHeight = 500
    const wrapper = renderWrapper(numberList, itemHeight, extraRows,
                                  windowHeight, itemCount)
    const prevLastElement = parseInt(wrapper.lastElementChild.innerHTML)
    fireEvent.scroll(wrapper,{target: {scrollTop: parseInt(wrapper.style.height)}})
    expect(parseInt(wrapper.firstElementChild.innerHTML)).toBeGreaterThan(prevLastElement)
    expect(parseInt(wrapper.lastElementChild.innerHTML)).toBe(numberList[itemCount-1])
  })
})
