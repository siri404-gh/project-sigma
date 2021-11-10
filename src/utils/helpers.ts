import fs from 'fs'

export const flatLinks = (
  obj: Record<any, any>,
  property: string,
  key: string,
  level: number,
) => {
  const res: string[] = []

  const traverse = (obj: Record<any, any>, property: string, count: number) => {
    obj[property].map((_property: Record<any, any>) => {
      if (count <= level) {
        if (_property[property]) traverse(_property, property, count + 1)
        if (count === level) res.push(_property[key])
      }
    })
  }
  traverse(obj, property, 0)
  return res
}

export const getFiles = (dir: string, files_?: string[]) => {
  files_ = files_ || []
  const files = fs.readdirSync(dir)
  for (const i in files) {
    const name = `${dir}/${files[i]}`
    if (fs.statSync(name).isDirectory()) {
      getFiles(name, files_)
    } else {
      files_.push(name)
    }
  }
  return files_
}
