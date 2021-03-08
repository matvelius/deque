// ID успешной посылки: 49260468

// ПРИНЦИП РАБОТЫ

// Структура "дек" реализована с помощью зацикленного массива, так как условие
// задачи не позволяет использовать связной список. Дек уникален тем, что позволяет
// "и добавлять, и извлекать элементы с обоих концов" (Практикум, Структуры данных: 
// очередь и дек) в отличие от стека и очереди. 

// Получив на входе кол-во предстоящих команд и размер дека, программа инициализирует
// массив заданной длины и заполняет все его ячейки величиной null. Кроме этого, создаются
// индексы frontIndex и backIndex для отслеживания первого и последнего элементов (что 
// обеспечивает "зацикленность"). 

// Последующий ввод пользователя проверяется на наличие ключевых слов - команд. Команды
// push_front и push_back передают следующее после них число соответствующим методам
// класса Deque, которые в свою очередь добавляют элемент в начало или в конец массива (если
// массив еще не заполнен) и увеличивают или уменьшают соответствующий индекс. Команды
// pop_front и pop_back извлекают элементы с начала или конца дека и тоже увеличивают
// или уменьшают соответствующие индексы.

// Существуют два исключения, при которых оба индекса должны указывать на один и тот же 
// элемент: когда в массиве 1 элемент при операции pop, и когда массив пустой при операции
// push.


// ДОКАЗАТЕЛЬСТВО КОРРЕКТНОСТИ

// Моя реализация дека отслеживает общее кол-во содержимых элементов и индексы начала и 
// конца, не позволяя пользователю выйти за границы зацикленного массива при добавлении
// и выдает соответствующую ошибку при попытке извлечения содержимого пустой ячейки.

// Для вычисления индекса во время перехода от последней ячейки к первой используется 
// оператор modulo (%), а от первой к последней - просто переводим индекс в конец массива.

// Количество действий пользователя строго ограничено, что позволяет сравнительно легко 
// исключить некорректное поведение программы. Кроме этого, в моем алгоритме есть различные 
// проверки ввода и учтены крайние случаи, и у меня не получилось сломать программу во
// время тестирования.


// ВРЕМЕННАЯ СЛОЖНОСТЬ

// Все возможные действия пользователя стоят О(1), так как нахождение элемента в массиве по
// индексу происходит моментально, без надобности обхода всего массива.


// ПРОСТРАНСТВЕННАЯ СЛОЖНОСТЬ

// Все данные программы хранятся в одном и том же массиве размера n, заданного пользователем.
// Таким образом временная сложность моего алгоритма O(n).

let readline = require('readline');
let rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: false
});

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
    } else {

      if (this.numberOfElements != 0) {
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
    } else {
      console.log(this.array[this.frontIndex])
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
    } else {
      console.log(this.array[this.backIndex])
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