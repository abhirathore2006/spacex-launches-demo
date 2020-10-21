import React, { useEffect, useReducer } from 'react';
import { range } from 'lodash';
import FilterGroup from './FilterGroup';

function filterReducer(state, action) {
  switch (action.type) {
    case 'on': {
      state = { ...state, [action.payload.filter]: action.payload.data };
      break;
    }
    case 'off': {
      state = { ...state, [action.payload.filter]: null };
      break;
    }
  }
  state.isInitial = false
  return state;
}

const FILTER_VALUES = {
  launch_year: {
    label: 'Launch Year',
    data: range(2006, 2021)
  },
  launch_success: {
    label: 'Successful Launch',
    data: ['True', 'False']
  },
  land_success: {
    label: 'Successful Landing',
    data: ['True', 'False']
  }
};

export default function FilterMenu({ setFilters }) {
  let [filterState, filterDispatch] = useReducer(filterReducer, {
    launch_year: null,
    launch_success: null,
    land_success: null,
    isInitial: true,
  });

  useEffect(() => {
      setFilters(filterState);
  }, [filterState]);
  return (
    <aside className="flex flex-row justify-center mb-4 md:mb-0 h-full w-full min-w-full md:min-w-0 md:w-1/3 lg:w-1/5  mr-2">
      <div className="bg-white w-full px-2 py-2" style={{ maxWidth: 300 }}>
        <header className="text-xl mb-4">Filters</header>
        {Object.keys(FILTER_VALUES).map((key) => {
          let val = FILTER_VALUES[key];
          return (
            <FilterGroup
              key={key}
              label={val.label}
              data={val.data}
              selected={filterState[key]}
              filterDispatch={filterDispatch}
              filterGroupType={key}
            />
          );
        })}
      </div>
    </aside>
  );
}
