import React from 'react'

export default function FilterGroup (props) {
  return (
    <section className="py-2">
      <header className="text-lg mb-4 text-center border-b-2 border-gray-400 border-separate">{props.label}</header>
      <ul className="flex flex-row flex-wrap justify-between">
        {props.data.map((item) => {
          const isSelected = props.selected === item
          return (
            <li className="my-2 w-2/5" key={`${props.filterGroupType}-${item}`}>
              <button
                onClick={() =>
                  props.filterDispatch({
                    type: isSelected ? 'off' : 'on',
                    payload: {
                      filter: props.filterGroupType,
                      data: item
                    }
                  })
                }
                className={`w-full outline-none focus:outline-none text-center py-2 rounded-md ${isSelected ? 'bg-green-700' : 'bg-green-400'}`}
              >
                {item}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
