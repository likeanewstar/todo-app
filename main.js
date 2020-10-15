'use strict';

const todoList = document.querySelector('.todo-list');
const todoInput = document.querySelector('.todo-input input');
const addTodoBtn =  document.querySelector('.todo-input button');

// 할 일 추가 기능
const onAdd = () => {
    const todoText = todoInput.value;

    // 폼이 비었을 경우 체크
    if (todoText === '') {
        todoInput.focus();
        return;
    }

    createItem(todoText);

    // 입력 후 input 초기화
    todoInput.value = '';
    todoInput.focus();
    setLS();
}

const createItem = (todoText) => {
    const todo = document.createElement('div');
    todo.setAttribute('class', 'todo');
    todoList.append(todo)

    const todoSpan = document.createElement('span');
    todoSpan.textContent = todoText;
    todo.append(todoSpan);

    const todoBtn = document.createElement('button');
    todoBtn.setAttribute('type', 'button');
    todoBtn.textContent = '❎'
    todo.append(todoBtn);

    todoBtn.addEventListener('click', () => {
        todoList.removeChild(todo);
        setLS();
    })

    return todo;
}

const setLS = () => {
    localStorage.setItem('myList', todoList.innerHTML)
}

const getLS = () => {
    todoList.innerHTML = localStorage.getItem('myList');
}

// 엔터 클릭 시 할 일 추가
todoInput.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        onAdd();
    }
})

// Add 버튼 클릭 시 할 일 추가
addTodoBtn.addEventListener('click', onAdd);

// 윈도우 로드 시 저장된 할 일 목록 불러오기
window.addEventListener('load', getLS)

// 빗자루 버튼 클릭 시 로컬 스토리지 초기화 & 새로고침
const clearBtn = document.querySelector('.btn-all-clear');

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    location.reload();
})