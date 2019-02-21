import Datastore from 'nedb'
import path from 'path'
import { remote } from 'electron'

const db = {
  cmsData: new Datastore({filename: path.join(remote.app.getPath('userData'), '/cmsData.db')})
}

export default {
  db
}
