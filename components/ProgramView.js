import React from 'react'
import { get } from 'lodash'

export default function ProgramView ({ launches }) {
  return (
    <main className="px-2 w-full h-full justify-center md:justify-start md:w-2/3 lg:w-4/5 flex flex-row flex-wrap">
      {launches.map((launch) => {
        let landing = get(launch, ['rocket', 'first_stage', 'cores', 0, 'land_success'])
        landing = landing == null ? '' : landing
        return (
          <article key={`${launch.launch_date_unix}`} className="px-2 mb-2 w-full min-w-full md:min-w-0 md:w-1/2 lg:w-1/4 flex flex-row justify-center">
            <div style={{ maxWidth: 300 }} className="bg-white w-full h-full py-4 px-4 flex flex-col">
              <img loading="lazy" alt={launch.mission_name + ' patch'} src={launch.links.mission_patch_small} className="bg-gray-400 w-full h-auto" />
              <h2 className="py-2 text-gray-700 text-lg">{`${launch.mission_name}#${launch.flight_number}`}</h2>
              <div>
                <h3 className="text-black text-lg font-semibold">Mission ids:</h3>
                <ul className="list-disc pl-6">
                  {launch.mission_id.map((mission) => {
                    return <li key={mission}>{mission}</li>
                  })}
                </ul>
              </div>
              <p className="w-full">
                <span className="w-1/2 text-gray-900 font-semibold">Launch Yead:</span>
                <span className="w-1/2 pl-4">{launch.launch_year}</span>
              </p>
              <p className="w-full">
                <span className="w-1/2 text-gray-900 font-semibold">Successful Launch:</span>
                <span className="w-1/2 capitalize pl-4">{String(launch.launch_success)}</span>
              </p>
              <p className="w-full">
                <span className="w-1/2 text-gray-900 font-semibold">Successful Landing:</span>
                <span className="w-1/2 capitalize pl-4">{String(landing)}</span>
              </p>
            </div>
          </article>
        )
      })}
    </main>
  )
}
