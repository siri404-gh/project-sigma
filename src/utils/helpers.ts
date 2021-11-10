import fs from 'fs'

type ObjType = {
  [key: string]: string | ObjType[]
}

const isArray = (val: any): boolean => Array.isArray(val)

export const flatLinks = (
  obj: ObjType,
  property: string,
  key: string,
  level: number,
  filter: (obj: ObjType) => boolean,
) => {
  const res: (ObjType[] | string)[] = []

  const traverse = (obj: ObjType, property: string, count: number) => {
    if (property in obj && isArray(obj[property])) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      obj[property].forEach(_property => {
        if (count <= level && filter(_property)) {
          if (_property[property]) traverse(_property, property, count + 1)
          if (count === level) res.push(_property[key])
        }
      })
    }
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
