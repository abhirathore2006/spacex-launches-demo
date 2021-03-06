import React, { useEffect, useState } from 'react'
import Head from 'next/head'

import FilterMenu from '../components/FilterMenu'
import ProgramView from '../components/ProgramView'

export default function IndexPage (props) {
  const [filters, setFilters] = useState(null)
  const [launches, setLaunches] = useState(props.launches)
  useEffect(() => {
    if (filters && !filters.isInitial) {
      fetchPrograms(filters)
        .then((data) => {
          setLaunches(data)
        })
        .catch((err) => {
          console.error(err)
          // no need to handle error as we already have some data displayed,
          // we can show notification error here
        })
    }
  }, [filters, setLaunches])
  return (
    <>
      <Head>
        <title>SpaceX Launch Programs</title>
        <meta name="description" content="SpaceX Launch Programs"></meta>
        <meta name="viewport" content="width=device-width, initial-scale=1"></meta>
      </Head>
      <div className="bg-gray-300 min-h-full min-w-full">
        <div className="h-full m-auto max-w-screen-xl">
          <header className="text-gray-900 text-2xl text-center md:text-left py-4">SpaceX Launch Programs</header>
          <section className="flex flex-col md:flex-row">
            <FilterMenu setFilters={setFilters} />
            <ProgramView launches={launches} />
          </section>
        </div>
        <div className="flex flex-row justify-center">
          <h3 className="text-lg font-medium leading-relaxed text-gray-600">
            Developed By:{' '}
            <a className="text-gray-900" href="https://github.com/abhirathore2006">
              Abhimanyu Rathore
            </a>
          </h3>
        </div>
      </div>
    </>
  )
}

function fetchPrograms (filters) {
  let url = 'https://api.spacexdata.com/v3/launches?limit=100'
  if (filters) {
    Object.keys(filters).forEach((key) => {
      if (filters[key] !== null && key !== 'isInitial') {
        url = `${url}&${key}=${String(filters[key]).toLowerCase()}`
      }
    })
  }
  return fetch(url).then((res) => res.json())
}

// using getStaticProps instead of getServerSideProps as data don't change that frequent
export async function getStaticProps (context) {
  return fetchPrograms()
    .then((data) => {
      return {
        props: {
          launches: data
        }
      }
    })
    .catch((err) => {
      console.error(err)
      return {
        props: {
          launches: []
        }
      }
    })
}
