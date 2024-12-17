// 日历功能
// 定义函数判断闰年
const isLeapYear = function (year) {
    if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        return true;
    }
    else {
        return false;
    }
}
// 确定二月份天数
const getFebDays = function (year) {
    return isLeapYear(year) ? 29 : 28;
}
const month_names = ['January', 'February', 'march', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const calendar = function (month, year) {
    let calendar_days = document.querySelector('.cal-days');
    calendar_days.innerHTML = '';
    let days_of_month = [31, getFebDays(year), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31,];

    let currentDate = new Date();
    let nowMonth = document.querySelector('.month');
    nowMonth.innerHTML = month_names[month];
    let first_day = new Date(year, month);

    for (let i = 0; i < days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement('div');
        if (i >= first_day.getDay()) {
            day.innerHTML = i - first_day.getDay() + 1;
            // 筛选出当前日期
            if (i - first_day.getDay() + 1 === currentDate.getDate() && year === currentDate.getFullYear() && month === currentDate.getMonth()) {
                day.classList.add('current-date');
            }
        }
        calendar_days.appendChild(day);
    }
}
// 调用创建日历函数
let currentDate = new Date();
let currentMonth = { value: currentDate.getMonth() };
let currentYear = { value: currentDate.getFullYear() };
calendar(currentMonth.value, currentYear.value);

// 鼠标经过显示月历
let nowMonth = document.querySelector('.month');
let cal_drop = document.querySelector('.cal-drop');

nowMonth.onmouseover = function () {
    cal_drop.style.display = 'block';
}
nowMonth.onmouseout = function () {
    cal_drop.style.display = 'none';
}

// today模块 返回当前时间
var today = document.querySelector('.today-time');
setInterval(getTime, 1000);// 开启计时器
// 封装函数
function getTime() {
    var time = new Date();
    let month = time.getMonth() + 1;
    let dates = time.getDate();
    let day = time.getDay();
    let arr = ['日', '一', '二', '三', '四', '五', '六'];
    let h = time.getHours();
    h = h < 10 ? '0' + h : h;
    let m = time.getMinutes();
    m = m < 10 ? '0' + m : m;
    let s = time.getSeconds();
    s = s < 10 ? '0' + s : s;
    today.innerHTML = month + '月' + dates + '日，星期' + arr[day] + ' ' + h + ':' + m + ':' + s;
}

// 切换选项卡功能
var type = document.querySelector('.list-type');
var type_list = type.querySelectorAll('li');
var item_list = document.querySelectorAll('.list-item');

for (let i = 0; i < type_list.length; i++) {
    type_list[i].setAttribute('index', i);
    type_list[i].onclick = function () {
        for (let i = 0; i < type_list.length; i++) {
            type_list[i].className = '';
        }
        this.className = 'type-current';

        var index = this.getAttribute('index');
        for (let i = 0; i < item_list.length; i++) {
            item_list[i].style.display = 'none';
        }
        item_list[index].style.display = 'block';
    }
}

//  点击任务选框切换状态
let taskBtn = document.querySelectorAll('.tasks li i');
let taskText = document.querySelectorAll('.tasks li');

for (let i = 0; i < taskBtn.length; i++) {
    let flag = 0;
    taskBtn[i].onclick = function () {
        if (flag == 0) {
            taskBtn[i].innerHTML = '';
            taskText[i].style.color = '#C0C0C0';
            taskText[i].style.textDecoration = 'line-through';
            flag = 1;
        }
        else {
            taskBtn[i].innerHTML = '';
            taskText[i].style.color = '#333';
            taskText[i].style.textDecoration = 'none';
            flag = 0;
        }
    }
}

// 添加新任务功能
let newTask = document.querySelector('.newtask input');
// let tasks = document.querySelector('.tasks');
let tasks = document.querySelectorAll('.tasks');
for (let j = 0; j < tasks.length; j++) {
    newTask.addEventListener('keyup', function (e) {
        if (e.keyCode == 13 && newTask.value != "") {
            let lis = document.createElement('li');
            lis.innerHTML = '<i class="iconBtn"></i>' + newTask.value + '<a href="javascript:;"></a>';
            lis.className = 'newli';
            tasks[j].insertBefore(lis, tasks[j].children[0]);
            newTask.value = '';

            // 给动态添加的任务绑定事件
            let iconBtn = tasks[j].querySelectorAll('.iconBtn');
            let taskText = tasks[j].querySelectorAll('.newli');
            let delBtn = tasks[j].querySelectorAll('.tasks a');
            // console.log(delBtn);
            for (let i = 0; i < iconBtn.length; i++) {
                let flag = 0;
                // 给选框图标绑定点击事件
                iconBtn[i].onclick = function (e) {
                    if (flag == 0) {
                        iconBtn[i].innerHTML = '';
                        taskText[i].style.color = '#C0C0C0';
                        taskText[i].style.textDecoration = 'line-through';
                        flag = 1;
                    }
                    else {
                        iconBtn[i].innerHTML = '';
                        taskText[i].style.color = '#333';
                        taskText[i].style.textDecoration = 'none';
                        flag = 0;
                    }
                };

                // 点击按钮删除任务
                delBtn[i].onclick = function () {
                    tasks[j].removeChild(this.parentNode);
                }
            }
        }
    })
};

// 点击按钮删除任务
let delTask = document.querySelectorAll('.tasks');
for (let i = 0; i < delTask.length; i++) {
    let delBtn = delTask[i].querySelectorAll('a');
    for (let j = 0; j < delBtn.length; j++) {
        delBtn[j].onclick = function () {
            delTask[i].removeChild(this.parentNode);
        }
    }
}
