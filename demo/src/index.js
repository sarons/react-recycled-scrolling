import React from 'react'
import {render} from 'react-dom'

import RecycledList from '../../src'
import ImageRow from './ImageRow'
import SheepRow from './SheepRow'

import './index.css'

const imageList = []
const numberList = []
for (let i = 1; i <= 1000; i++) {
  imageList.push({
    no: i,
    alt: `thumbnail of ${i}.jpg`,
    url: `https://picsum.photos/id/${i}/100/100.jpg`
  })
}
for (let i = 1; i <= 20000; i++) numberList.push(i)

function Demo() {
  return (
    <div>
      <div class="Split Left">
        <p>
          <b>Recycled Image List of {imageList.length} images</b>
        </p>
        <RecycledList
          itemFn={ImageRow}
          attrList={imageList}
          itemHeight={120}
        />
      </div>

      <div class="Split Right">
        <p>
          <b>Recycled List of {numberList.length} Sheep</b>
        </p>
        <RecycledList
          itemFn={SheepRow}
          attrList={numberList}
          itemHeight={30}
        />
      </div>
    </div>
  )
}

render(<Demo/>, document.querySelector('#demo'))
