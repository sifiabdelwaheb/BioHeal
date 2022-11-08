import { reducer as packhome } from './package/packhomeRedux'
import { combineReducers } from 'redux'
import settings from './settings/reducer'
import { reducer as auth } from './auth/authUserRedux'
import { reducer as contactUs } from './auth/contactUsRedux'
import { reducer as packageUS } from './package/packageUSRedux'
import { reducer as RegisterUser } from './package/RegisterUserRedux'
import { reducer as ProductSimilarity } from './similarity/ProductSimilarity'
import { reducer as Moteur } from './moteur/MoteruRedux'
import { reducer as message } from './chatbot/Message'
import { reducer as profiling } from './profiling/profilingRedux'
import { reducer as chart } from './profiling/piechart'
import { reducer as sentiment } from './sentiment/sentimentRedux'
import menu from './menu/reducer'
import { reducer as plant } from './plant/PlantRedux'
import { reducer as deleteplant } from './plant/deletePlantRedux'
import { reducer as updateplant } from './plant/updatePlantRedux'
import { reducer as identify } from './plant/identifyRedux'
import { reducer as addUser } from './users/addUserRedux'
import { reducer as editUser } from './users/editUserRedux'
import { reducer as deleteUser } from './users/deleteUserRedux'
import { reducer as allUsers } from './users/getAllUsersRedux'
import { reducer as search } from './plant/searchRedux'
import {reducer as details } from './plant/detailsRedux'
import {reducer as foods} from './Foods/FoodsRedux'
const reducers = combineReducers({
  settings,
  allUsers,
  deleteUser,
  auth,
  menu,
  contactUs,
  packageUS,
  RegisterUser,
  message,
  ProductSimilarity,
  Moteur,
  profiling,
  chart,
  sentiment,
  plant,
  addUser,
  editUser,
  deleteplant,
  updateplant,
  identify,
  details,
  search,
  foods
})

export default reducers
