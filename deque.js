const fs = require('fs')

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  // input: fs.createReadStream('test.txt'),
  output: process.stdout,
  terminal: false
});

// let logger = fs.createWriteStream('output.txt', {
//   flags: 'a' // 'a' means appending (old data will be preserved)
// })

let lineIndex = 0
let numberOfCommands = 0
let dequeSize = 0
let deque = null

class Deque {

  constructor(length) {
    this.array = this.initializeArray(length)
    this.maxNumberOfElements = length
    this.frontIndex = 0
    this.backIndex = 0
    this.numberOfElements = 0
  }

  initializeArray(length) {
    let nullArray = new Array(length)
    for (let i = 0; i < length; i++) {
      nullArray[i] == null
    }
    return nullArray
  }

  push_front(value) {

    if (this.numberOfElements == this.maxNumberOfElements) {
      console.log("error")
      // logger.write('error\n')
    } else {

      if (this.numberOfElements != 0) { // change the index only if the array is not empty
        if (this.frontIndex == 0) { 
          this.frontIndex = this.maxNumberOfElements - 1
        } else { 
          this.frontIndex = this.frontIndex - 1
        }
      }

      this.array[this.frontIndex] = value
      this.numberOfElements += 1
    }
    
  }

  push_back(value) {
    
    if (this.numberOfElements == this.maxNumberOfElements) {
      console.log("error")
      // logger.write('error\n')
    } else {
      
      if (this.numberOfElements != 0) {
        this.backIndex = (this.backIndex + 1) % this.maxNumberOfElements
      }
      
      this.array[this.backIndex] = value
      this.numberOfElements += 1
    }
    
  }

  pop_front() {

    if (this.array[this.frontIndex] == null) {
      console.log("error")
      // logger.write('error\n')
    } else {
      console.log(this.array[this.frontIndex])
      // logger.write(`${this.array[this.frontIndex]}\n`)
      this.array[this.frontIndex] = null
      if (this.numberOfElements > 1) {
        this.frontIndex = (this.frontIndex + 1) % this.maxNumberOfElements
      }
      this.numberOfElements -= 1
    }
    
  }

  pop_back() {

    if (this.array[this.backIndex] == null) {
      console.log("error")
      // logger.write('error\n')
    } else {
      console.log(this.array[this.backIndex])
      // logger.write(`${this.array[this.backIndex]}\n`)
      this.array[this.backIndex] = null

      if (this.numberOfElements > 1) {
        if (this.backIndex == 0) {
          this.backIndex = this.maxNumberOfElements - 1
        } else {
          this.backIndex = this.backIndex - 1
        }
      }

      this.numberOfElements -= 1
    }

  }

}

rl.on('line', function (line) {

  if (lineIndex == 0) {

    numberOfCommands = parseInt(line)

    if (numberOfCommands == 0) {
      rl.close()
      return
    }

  } else if (lineIndex == 1) {

    dequeSize = parseInt(line)

    if (dequeSize == 0) {
      rl.close()
      return
    }

    deque = new Deque(dequeSize)

  } else if (lineIndex < numberOfCommands + 1) {

    processCommand(line)

  } else { // last line

    processCommand(line)
    rl.close()

  }

  lineIndex += 1
})

function processCommand(command) {

  if (command.includes("push_front")) {

    let newValue = parseInt(command.split(' ')[1])
    deque.push_front(newValue)

  } else if (command.includes("push_back")) {

    let newValue = parseInt(command.split(' ')[1])
    deque.push_back(newValue)

  } else if (command === "pop_front") {

    deque.pop_front()

  } else if (command === "pop_back") {

    deque.pop_back()

  }

}

// function test() {
//   numberOfCommands = 4
//   dequeSize = 4
//   let myDeque = new Deque(dequeSize)

//   myDeque.push_front(861)
//   myDeque.push_front(-819)
//   myDeque.pop_back()
//   myDeque.pop_back()

//   return
// }


// function test() {
//   numberOfCommands = 7
//   dequeSize = 10
//   let myDeque = new Deque(dequeSize)

//   myDeque.push_front(-855)
//   myDeque.push_front(720)
//   myDeque.pop_back()
//   myDeque.pop_back()
//   myDeque.push_back(844)
//   myDeque.pop_back()
//   myDeque.push_back(823)

//   return
// }

// function test() {
//   numberOfCommands = 6
//   dequeSize = 6
//   let myDeque = new Deque(dequeSize)

//   myDeque.push_front(-201)
//   myDeque.push_back(959)
//   myDeque.push_back(102)
//   myDeque.push_front(20)
//   myDeque.pop_front()
//   myDeque.pop_back()

//   return
// }

// function test() {
//   numberOfCommands = 25
//   dequeSize = 5
//   let myDeque = new Deque(dequeSize)

//   myDeque.push_front(861)
//   myDeque.push_front(-819)
//   myDeque.push_front(193)
//   myDeque.push_front(921)
//   myDeque.push_front(-210)

//   myDeque.pop_front()
//   myDeque.pop_front()
//   myDeque.pop_front()
//   myDeque.pop_front()
//   myDeque.pop_front()

//   myDeque.push_back(43)
//   myDeque.push_back(56)
//   myDeque.push_back(123)
//   myDeque.push_back(-533)
//   myDeque.push_back(-10)

//   myDeque.pop_back()
//   myDeque.pop_back()
//   myDeque.pop_back()
//   myDeque.pop_back()
//   myDeque.pop_back()

//   myDeque.push_front(61)
//   myDeque.push_front(19)
//   myDeque.push_front(93)
//   myDeque.push_front(91)
//   myDeque.push_front(-21)

//   console.log(JSON.stringify(myDeque))

//   return
// }

// test()

// Заполняешь полностью дек,
//   удаляешь полностью сначала
//     добавляешь новые с конца

//   удаляешь полностью с конца
//     добавляешь с начала

