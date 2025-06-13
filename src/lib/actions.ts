'use server'

import path from 'path'
import fs from 'fs'

export const writeDataToTestFile = async (data: JSON) => {
  const filePath = path.join(process.cwd(), 'test.json')
  fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.', err)
    }
  })
}
