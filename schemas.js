// :::: Models (Schemas) :::: //

let contract = {
  //using objects here in case we decide to add more props to our subObjs.
  id: 'someID'
  target: {userId: 'id'},
  assignedTo: {userId: 'id'},
  timeStamp: new Date(),

}

let user = {
  id: 'id',
  username: 'name',
  password: 'hash'
}

let player = {
  curContract: 'contractID',
  games: ['gameID1', 'gameID2'],
  completedAchievements: {didTheThing: false, killedAGuy: true}
