// import { postgraphile }  from 'postgraphile'
const { makeExtendSchemaPlugin, gql } = require('graphile-utils')
const request = require('request-promise-native')

const endpoint = 'https://www.metaweather.com/api/location/'

async function getWeather(woeid) {
  var header = { 
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
  const url = endpoint + token + '/'

  try {
    return await request(options);
  } catch (e) {
    return e
  }
}

async function findWhereOnEarthIDByPlaceName(placeName) {
  let url = endpoint + 'search/?query=' + placeName
  try {
    return await request.get(url)
  } catch (e) {
    return e
  }
}

module.exports = {
  WeatherPlugin: makeExtendSchemaPlugin(build => {
    const { pgSql: sql } = build;
    return {
      typeDefs: gql`
        type WOEIDResult {
          title: String
          location_type: String
          woeid: Integer
          latt_long: String
        }

        extend type Query {
          findWhereOnEarthIDByPlaceName(placeName: String!): WOEIDResult
        }
  
        extend type Query {
          getWeather(WOEID: Integer!): Object
        }
      `,
      resolvers: {
        Query: {
          getWeather: async (
            _query,
            args,
            context,
            resolveInfo,
            hasSelectGraphQLResultFromTable,
          ) => {
            return await getWeather(args.WOEID)
          },
          findWhereOnEarthIDByPlaceName: async (
            _query,
            args,
            context,
            resolveInfo,
            { selectGraphQLResultFromTable }
          ) => {
            return await getResult(args.placeName)
          }          
        }
      }
    }
  })
}


