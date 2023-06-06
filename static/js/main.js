var nums = ["00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00"]
var mxts = ["", "", "", "", "", "", "", "", "", "", "", ""]
var qqs = ["", "", "", "", "", "", "", "", "", "", "", ""]
var nums8 = ["00", "00", "00", "00", "00", "00", "00", "00"]
var mxts8 = ["", "", "", "", "", "", "", ""]
var qqs8 = ["", "", "", "", "", "", "", ""]
var colorLst = ["table-primary", "table-secondary", "table-warning", "table-info"]
var currentUser = ""
var currentTime12 = 0
var currentTime8 = 0
var toast = null
var lstTimes = 0
var hc = []
var hz = []
var isAdmin = false
var timerId = null
var userSelect = 1

function changeTag() {
    getMxtInfo()
    saveData()
    initial()
    senderInfo()
    triggerToast("更新成功", "请查看最新信息！")
}

function resetAllData(reload) {
    nums = ["00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00", "00"]
    mxts = ["", "", "", "", "", "", "", "", "", "", "", ""]
    qqs = ["", "", "", "", "", "", "", "", "", "", "", ""]
    nums8 = ["00", "00", "00", "00", "00", "00", "00", "00"]
    mxts8 = ["", "", "", "", "", "", "", ""]
    qqs8 = ["", "", "", "", "", "", "", ""]
    currentUser = ""
    currentTime8 = 0
    currentTime12 = 0
    lstTimes = 0
    hc = []
    hz = []
    isAdmin = false
    const selectElement = document.getElementById('mySelect');
    const selectElement8 = document.getElementById('mySelect8');
    selectElement.value = 0
    selectElement8.value = 0
    initial()
    saveData()
    if (timerId != null) {
        clearInterval(timerId);
    }
    if (reload) {
        location.reload()
    }
}

function checkAuthority(userName, pwd) {
    return fetch('https://api.wyyz.club/checkAuthority', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            user: userName,
            pwd: pwd
        })
    }).then(response => {
        return response.json()
    })
}

function getUserIP(onIPReceived) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.ipify.org?format=json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            onIPReceived(response.ip);
        }
    };
    xhr.send();
}

// 发送 IP 地址给后端
function sendIPToBackend(ip) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://api.wyyz.club/ipReciver', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            console.log(xhr.responseText);
        }
    };
    xhr.send(JSON.stringify({ip: ip, currentUser: currentUser}));
}

function getLocalTime(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear(); // 年份
    const month = date.getMonth() + 1; // 月份，注意要加 1
    const day = date.getDate(); // 日
    const hour = date.getHours(); // 小时
    const minute = date.getMinutes(); // 分钟
    const second = date.getSeconds(); // 秒
    const timeStr = `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    return timeStr
}

function getOnlineUser() {
    fetch('https://api.wyyz.club/getOnlineUser', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json()
    }).then(data => {
        let userListOl = data
        console.log(userListOl)
        var userListOlDiv = document.getElementById("userListOl");
        userListOlDiv.innerHTML = ""
        for (let key in userListOl) {
            console.log(key + ": " + userListOl[key]);
            // 创建一个新的 li 元素
            const newLiElement = document.createElement('li');
            // 设置新的 li 元素的文本内容
            const parts = key.split('.');
            const maskedIpAddress = `${parts[0]}.${parts[1]}.***.***`;
            newLiElement.textContent = `${maskedIpAddress}\t${userListOl[key]['num']}\t上次活跃时间：${getLocalTime(userListOl[key]['lastActiveTime'])}`;
            // 将新的 li 元素插入到 ol 元素中
            userListOlDiv.appendChild(newLiElement);
        }
    })
}

function saveData() {
    localforage.setItem('data', {
        "nums": nums,
        "mxts": mxts,
        "qqs": qqs,
        "nums8": nums8,
        "mxts8": mxts8,
        "qqs8": qqs8,
        "currentUser": currentUser,
        "currentTime8": currentTime8,
        "currentTime12": currentTime12,
        "lstTimes": lstTimes,
        "hc": hc,
        "hz": hz,
        "isAdmin": isAdmin
    })
}

function home() {
    var imageShow = document.getElementById('imageShow');
    var tableShow12 = document.getElementById('tableShow12');
    var tableShow8 = document.getElementById('tableShow8');
    var lstDiv = document.getElementById('lst');
    var fight = document.getElementById('fightBtn');
    fight.disabled = true
    imageShow.style = ""
    tableShow12.style = "display: none;"
    tableShow8.style = "display: none;"
    lstDiv.style = "display: none;"
    userSelect = 1
    changeTag()
}

function eight() {
    var imageShow = document.getElementById('imageShow');
    var tableShow12 = document.getElementById('tableShow12');
    var tableShow8 = document.getElementById('tableShow8');
    var lstDiv = document.getElementById('lst');
    var fight = document.getElementById('fightBtn');
    fight.disabled = true
    imageShow.style = "display: none;"
    tableShow12.style = "display: none;"
    tableShow8.style = ""
    lstDiv.style = "display: none;"
    userSelect = 3
    changeTag()
}

function twelve() {
    var imageShow = document.getElementById('imageShow');
    var tableShow12 = document.getElementById('tableShow12');
    var tableShow8 = document.getElementById('tableShow8');
    var lstDiv = document.getElementById('lst');
    var fight = document.getElementById('fightBtn');
    fight.disabled = true
    imageShow.style = "display: none;"
    tableShow12.style = ""
    tableShow8.style = "display: none;"
    lstDiv.style = "display: none;"
    userSelect = 2
    changeTag()
}

function lst() {
    var imageShow = document.getElementById('imageShow');
    var tableShow12 = document.getElementById('tableShow12');
    var tableShow8 = document.getElementById('tableShow8');
    var lstDiv = document.getElementById('lst');
    var fight = document.getElementById('fightBtn');
    fight.disabled = false
    imageShow.style = "display: none;"
    tableShow12.style = "display: none;"
    tableShow8.style = "display: none;"
    lstDiv.style = ""
    userSelect = 4
    changeTag()

}

function fight() {
    let userInput = prompt("请输入您要新增的波数（后续可以点击开团按钮调整）：");
    let times = parseInt(userInput);
    updateLst(times, false)
}

function triggerToast(title, msg) {
    var toastTitle = document.getElementById('mystrong');
    const myToastBody = document.getElementById('my-toast-body');
    myToastBody.textContent = msg
    toastTitle.textContent = title
    toast.show()
}

function login() {
    var userNum = document.getElementById("user-num");
    var userPwd = document.getElementById("user-pwd");
    var userNumValue = userNum.value;
    var userPwdValue = userPwd.value;
    console.log("userNum: " + userNumValue)
    // 关闭模态框
    var modal = document.getElementById('exampleModal');
    var modalInstance = bootstrap.Modal.getInstance(modal);
    modalInstance.hide();

    checkAuthority(userNumValue, userPwdValue).then(result => {
        console.log(result, 'login')
        if (result['result'] == false) {
            triggerToast("登陆失败", "Admin用户需要正确的验证码才能登陆。")
            return
        }
        if (result['role'] == 'admin' && result['result'] == true) {
            isAdmin = true
        }
        currentUser = userNumValue
        saveData()
        setUser()
        triggerToast("登陆成功", `欢迎你，${isAdmin == false ? "用户" : "管理员"}：` + currentUser + '!')
        getUserIP(sendIPToBackend);
    });


}

function loginOut() {
    var loginBtn = document.getElementById('loginBtn');
    var logoutBtn = document.getElementById('logoutBtn');
    loginBtn.innerHTML = "登陆";
    loginBtn.disabled = false;
    logoutBtn.disabled = true
    currentUser = ""
    isAdmin = false
    saveData()
    triggerToast("登出成功", "欢迎下次光临~")
    // 取消定时器
    if (timerId != null) {
        clearInterval(timerId);
    }
}

function senderInfo() {
    if (!isAdmin) {
        console.log('此函数仅供admin使用')
        return
    }
    fetch('https://api.wyyz.club/adminSetInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nums: nums,
            mxts: mxts,
            qqs: qqs,
            nums8: nums8,
            mxts8: mxts8,
            qqs8: qqs8,
            currentTime8: currentTime8,
            currentTime12: currentTime12,
        })
    }).then(response => {
        console.log("sendInfo:", response.status)
    })
}

function setUser() {
    // 替换登陆按钮
    var loginBtn = document.getElementById('loginBtn');
    var logoutBtn = document.getElementById('logoutBtn');
    loginBtn.innerHTML = `当前登陆${isAdmin == false ? "用户" : "管理员"}编号：` + currentUser;
    loginBtn.disabled = true;
    logoutBtn.disabled = false
    if (!isAdmin) {
        if (timerId == null) {
            timerId = setInterval(autoUpdateInfo, 10000);
        }
        var updateButton = document.getElementById("update");
        var updateButton8 = document.getElementById("update8");
        var resetButton = document.getElementById("reset");
        var resetButton8 = document.getElementById("reset8");
        const selectElement = document.getElementById('mySelect');
        const selectElement8 = document.getElementById('mySelect8');
        selectElement8.disabled = true
        selectElement.disabled = true
        resetButton.disabled = true
        resetButton8.disabled = true
        updateButton8.disabled = true
        updateButton.disabled = true

    } else {
        var updateButton = document.getElementById("update");
        var updateButton8 = document.getElementById("update8");
        var resetButton = document.getElementById("reset");
        var resetButton8 = document.getElementById("reset8");
        const selectElement = document.getElementById('mySelect');
        const selectElement8 = document.getElementById('mySelect8');
        selectElement.disabled = false
        selectElement8.disabled = false
        resetButton.disabled = false
        resetButton8.disabled = false
        updateButton8.disabled = false
        updateButton.disabled = false
    }
}

function updateLst(num, isInitial) {
    let temp = lstTimes
    if (isInitial) {
        lstTimes = 0
    }
    var lstTbody = document.getElementById('lstTbody')
    for (var x = lstTimes; x < lstTimes + num; x++) {

        console.log(colorLst[x % 5])
        var lstTr = `<tr id="lstTr${x + 1}" class="${colorLst[x % 5]}"></tr>`
        lstTbody.insertAdjacentHTML('beforeend', lstTr);
        var lstTrInstance = document.getElementById(`lstTr${x + 1}`)
        lstTrInstance.insertAdjacentHTML("beforeend", `<th scope="col">${x + 1}</th>`)
        if (!isInitial) {
            hc.push(["", "", "", ""])
        }

        for (var y = 0; y < 4; y++) {
            let vaule = ""
            if (isInitial) {
                vaule = hc[x][y]
            }
            let td = `<td><input type="text" class="form-control highlight2" id="hc${x}-${y}" value="${vaule}" placeholder="红C冒险团|角色名"></td>`
            lstTrInstance.insertAdjacentHTML('beforeend', td)
            const Input = document.getElementById(`hc${x}-${y}`);

            Input.addEventListener('input', (event) => {
                let ids = event.target.id.replace('hc', '')
                let m = ids.split('-')[0]
                let n = ids.split('-')[1]
                console.log(('hc', ids))
                hc[m][n] = event.target.value
                saveData()
            });
        }

        if (!isInitial) {
            hz.push(["", "", "", ""])
        }

        for (var z = 0; z < 4; z++) {
            let vaule = ""
            if (isInitial) {
                vaule = hz[x][z] != undefined ? hz[x][z] : ""
            }
            let td = `<td><input  type="text" class="form-control" id="hz${x}-${z}" value="${vaule}" placeholder="混子冒险团|角色名"></td>`
            lstTrInstance.insertAdjacentHTML('beforeend', td)
            const Input = document.getElementById(`hz${x}-${z}`);

            Input.addEventListener('input', (event) => {
                let ids = event.target.id.replace('hz', '')
                let m = ids.split('-')[0]
                let n = ids.split('-')[1]
                console.log(('hz', ids))
                hz[m][n] = event.target.value
                saveData()
            });
        }
    }
    if (isInitial) {
        lstTimes = temp
    } else {
        lstTimes = lstTimes + num
    }

    saveData()
}

function autoUpdateInfo() {
    if (isAdmin) {
        console.log('admin用户不需要执行此函数')
        return
    }
    console.log('定时任务执行')
    fetch('https://api.wyyz.club/getInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(response => {
        return response.json()
    }).then(data => {
        console.log(data)
        nums = data['nums']
        mxts = data['mxts']
        qqs = data['qqs']
        nums8 = data['nums8']
        mxts8 = data['mxts8']
        qqs8 = data['qqs8']
        currentTime8 = data['currentTime8']
        currentTime12 = data['currentTime12']
        const selectElement8 = document.getElementById('mySelect8');
        const selectElement = document.getElementById('mySelect');
        if (currentTime12 > 0) {
            selectElement.value = currentTime12
        }
        if (currentTime8 > 0) {
            selectElement8.value = currentTime8
        }
        getMxtInfo()
        saveData()
        initial()
    })
}

function initial() {
    const toastLiveExample = document.getElementById('liveToast')
    toast = new bootstrap.Toast(toastLiveExample)

    if (currentUser !== null && currentUser !== undefined && currentUser !== "") {
        setUser()
    }

    const selectElement = document.getElementById('mySelect');

    if (currentTime12 != 0 && currentTime12 < 13) {
        selectElement.value = currentTime12
    }

    selectElement.addEventListener('change', (event) => {
        console.log(`Selected option value: ${event.target.value}`);
        currentTime12 = event.target.value
        saveData()
        triggerToast("操作成功", `当前是第${currentTime12}波团，请点击更新按钮更新数据！`)
    });

    const selectElement8 = document.getElementById('mySelect8');

    if (currentTime8 != 0 && currentTime8 < 5) {
        selectElement8.value = currentTime8
    }

    selectElement8.addEventListener('change', (event) => {
        console.log(`Selected option value: ${event.target.value}`);
        currentTime8 = event.target.value
        saveData()
        triggerToast("操作成功", `当前是第${currentTime8}波团，请点击更新按钮更新数据！`)
    });

    const types = [
        ["奶", "混", "C", "混", "C", "混"],
        ["混", "奶", "混", "C", "混", "C"],
        ["C", "混", "奶", "混", "C", "混"],
        ["混", "C", "混", "奶", "混", "C"],
        ["C", "混", "C", "混", "奶", "混"],
        ["混", "C", "混", "C", "混", "奶"],
    ]
    const defaultTbale = '<table class="table "> <thead> <tr> <th scope="col">编号</th> <th scope="col">冒险团</th> <th scope="col">球球号</th> <th scope="col">第1波</th> <th scope="col">第2波</th> <th scope="col">第3波</th> <th scope="col">第4波</th> <th scope="col">第5波</th> <th scope="col">第6波</th> </tr> </thead> <tbody> <tr id="c1" class="table-warning"></tr> <tr id="c2" class="table-secondary"></tr> <tr id="c3" class="table-success"></tr> <tr id="c4" class="table-warning"></tr> <tr id="c5" class="table-secondary"></tr> <tr id="c6" class="table-success"></tr> <tr id="c7" class="table-warning"></tr> <tr id="c8" class="table-secondary"></tr> <tr id="c9" class="table-success"></tr> <tr id="c10" class="table-warning"></tr> <tr id="c11" class="table-secondary"></tr> <tr id="c12" class="table-success"></tr> </tbody> </table>'
    //default num

    const currnetInfo = document.getElementById('currentInfo')

    if (userSelect == 1 || userSelect == 4 || userSelect == 5) {
        currnetInfo.innerHTML = `维一圆桌欢迎您`
    }

    if (userSelect == 2) {
        try {
            var userToPlay = ""
            if (nums.indexOf(currentUser) !== -1) {
                userToPlay = types[Math.floor((nums.indexOf(currentUser)) / 2)][currentTime12 - 1]
            }
            if (userToPlay !== undefined && currentTime12 !== 0 && userToPlay !== "") {
                currnetInfo.innerText = `当前是第${currentTime12}波，您需要上${userToPlay}`
            } else {
                currnetInfo.innerHTML = `当前未开团或者您不在团中`
            }

        } catch (e) {
            console.log(e)
        }
    }
    var table = document.getElementById("mainTable");

    table.innerHTML = defaultTbale

    for (var x = 1; x < 13; x++) {
        //获取需要操作的<tr>元素
        var row = document.getElementById(`c${x}`);

        var value = nums[x - 1] === "00" ? "" : nums[x - 1]

        //编号
        var bh = `<td><input id="t${x}" type="text" class="form-control" id="inputName" value="${value}" placeholder="圆桌编号" style="max-width: 10ch;"></td>`;
        row.insertAdjacentHTML('beforeend', bh);

        const Input = document.querySelector(`#t${x}`);

        Input.addEventListener('input', (event) => {
            let id = event.target.parentNode.parentNode.id.replace('c', '')
            if (event.target.value == "") {
                mxts[id - 1] = ""
                nums[id - 1] = "00"
                return
            }
            nums[id - 1] = event.target.value
            console.log(nums)
            saveData()
        });

        var mxtValue = mxts[x - 1] === "" ? "" : mxts[x - 1]
        var qqValue = qqs[x - 1] === "" ? "" : qqs[x - 1]
        //冒险团
        var mxt = `<td><input type="text" id="tt${x}" class="form-control col-md-6" id="inputName" value="${mxtValue}" placeholder="冒险团ID" style="max-width: 20ch;"></td>`;
        row.insertAdjacentHTML('beforeend', mxt);

        //qq
        var qq = `<td><input type="text" id="qq${x}" class="form-control col-md-6" id="inputName" value="${qqValue}" style="max-width: 13ch;" readonly></td>`;
        row.insertAdjacentHTML('beforeend', qq);

        const mxtInput = document.querySelector(`#tt${x}`);
        mxtInput.addEventListener('input', (event) => {
            let id = event.target.parentNode.parentNode.id.replace('c', '')
            mxts[id - 1] = event.target.value
            console.log(mxts)
            saveData()
        });

        for (var y = 0; y < 6; y++) {
            var name = `${nums[x - 1]}-${types[Math.floor((x - 1) / 2)][y]}`
            var styleType = types[Math.floor((x - 1) / 2)][y] == "C" ? "table-primary" : types[Math.floor((x - 1) / 2)][y] == "奶" ? "table-info" : "table-light"
            if (nums[x - 1] === currentUser && y + 1 == currentTime12) {
                styleType = "table-danger highlight"
            }
            var info = `<td class="${styleType}"><div class="form-check"><label class="form-check-label" for="checkbox4">${name}</label><input class="form-check-input" type="checkbox" value="" id="checkbox4"></div></td>`;
            row.insertAdjacentHTML('beforeend', info);
        }
    }

    const types8 = [
        ["奶", "混", "C", "混"],
        ["混", "奶", "混", "C"],
        ["C", "混", "奶", "混"],
        ["混", "C", "混", "奶"]
    ]
    const defaultTbale8 = '<table class="table "> <thead> <tr> <th scope="col">编号</th> <th scope="col">冒险团</th> <th scope="col">球球号</th> <th scope="col">第1波</th> <th scope="col">第2波</th> <th scope="col">第3波</th> <th scope="col">第4波</th> </tr> </thead> <tbody> <tr id="c81" class="table-warning"></tr> <tr id="c82" class="table-secondary"></tr> <tr id="c83" class="table-success"></tr> <tr id="c84" class="table-warning"></tr> <tr id="c85" class="table-secondary"></tr> <tr id="c86" class="table-success"></tr> <tr id="c87" class="table-warning"></tr> <tr id="c88" class="table-secondary"></tr> </tbody> </table>'
    //default num
    if (userSelect == 3) {
        try {
            var userToPlay = ""
            if (nums8.indexOf(currentUser) !== -1) {
                userToPlay = types8[Math.floor((nums8.indexOf(currentUser)) / 2)][currentTime8 - 1]
            }
            if (userToPlay !== undefined && currentTime8 !== 0 && userToPlay !== "") {
                currnetInfo.innerHTML = `当前是第${currentTime8}波，您需要上${userToPlay}`
            } else {
                currnetInfo.innerHTML = `当前未开团或者您不在团中`
            }

        } catch (e) {
            console.log(e)
        }
    }

    var mainTable8 = document.getElementById("mainTable8");

    mainTable8.innerHTML = defaultTbale8
    for (var x = 1; x < 9; x++) {
        //获取需要操作的<tr>元素
        var row8 = document.getElementById(`c8${x}`);
        var value8 = nums8[x - 1] === "00" ? "" : nums8[x - 1]

        //编号
        var bh8 = `<td><input id="t8${x}" type="text" class="form-control" id="inputName" value="${value8}" placeholder="圆桌编号" style="max-width: 10ch;"></td>`;
        row8.insertAdjacentHTML('beforeend', bh8);

        const Input8 = document.querySelector(`#t8${x}`);

        Input8.addEventListener('input', (event) => {
            let id = event.target.parentNode.parentNode.id.replace('c8', '')
            if (event.target.value == "") {
                mxts8[id - 1] = ""
                nums8[id - 1] = "00"
                return
            }
            nums8[id - 1] = event.target.value
            console.log(nums8)
            saveData()
        });

        var mxtValue8 = mxts8[x - 1] === "" ? "" : mxts8[x - 1]
        var qqValue8 = qqs8[x - 1] === "" ? "" : qqs8[x - 1]
        //冒险团
        var mxt8 = `<td><input type="text" id="tt8${x}" class="form-control col-md-6" id="inputName" value="${mxtValue8}" placeholder="冒险团ID" style="max-width: 20ch;"></td>`;
        row8.insertAdjacentHTML('beforeend', mxt8);

        //qq
        var qq8 = `<td><input type="text" id="qq${x}" class="form-control col-md-6" id="inputName" value="${qqValue8}" style="max-width: 13ch;" readonly></td>`;
        row8.insertAdjacentHTML('beforeend', qq8);

        const mxtInput8 = document.querySelector(`#tt8${x}`);
        mxtInput8.addEventListener('input', (event) => {
            let id = event.target.parentNode.parentNode.id.replace('c8', '')
            mxts[id - 1] = event.target.value
            console.log(mxts)
            saveData()
        });

        for (var y = 0; y < 4; y++) {
            var name8 = `${nums8[x - 1]}-${types[Math.floor((x - 1) / 2)][y]}`
            var styleType8 = types[Math.floor((x - 1) / 2)][y] == "C" ? "table-primary" : types[Math.floor((x - 1) / 2)][y] == "奶" ? "table-info" : "table-light"
            if (nums8[x - 1] === currentUser && y + 1 == currentTime8) {
                styleType8 = "table-danger highlight"
            }
            var info8 = `<td class="${styleType8}"><div class="form-check"><label class="form-check-label" for="checkbox4">${name8}</label><input class="form-check-input" type="checkbox" value="" id="checkbox4"></div></td>`;
            row8.insertAdjacentHTML('beforeend', info8);
        }
    }

}

function getMxtInfo() {
    for (var x = 0; x < nums.length; x++) {
        if (data[nums[x]] != null) {
            mxts[x] = data[nums[x]]['mxt']
            qqs[x] = data[nums[x]]['qq']
        } else {
            mxts[x] = ""
            qqs[x] = ""
        }
    }
    for (var x = 0; x < nums8.length; x++) {
        if (data[nums8[x]] != null) {
            mxts8[x] = data[nums8[x]]['mxt']
            qqs8[x] = data[nums8[x]]['qq']
        } else {
            mxts8[x] = ""
            qqs8[x] = ""
        }
    }
}

setInterval(() => {
    // 调用函数
    getUserIP(sendIPToBackend);
}, 1000 * 5
);

localforage.getItem('data').then(function (value) {
    console.log(value); // 打印获取到的候选项数组
    if (value != null) {
        nums = value['nums']
        mxts = value['mxts']
        currentUser = value['currentUser']
        qqs = value['qqs']
        nums8 = value['nums8']
        mxts8 = value['mxts8']
        qqs8 = value['qqs8']
        currentTime8 = value['currentTime8']
        currentTime12 = value['currentTime12']
        hz = value['hz']
        hc = value['hc']
        lstTimes = value['lstTimes']
        isAdmin = value['isAdmin']
    }

    if (lstTimes != 0) {
        console.log("流水团数据不为空")
        updateLst(lstTimes, true)
    }

    var resetButton = document.getElementById("reset");

    resetButton.addEventListener("click", function () {
        resetAllData(false)
    });

    var updateButton = document.getElementById("update");

    updateButton.addEventListener("click", function () {
        getMxtInfo()
        saveData()
        initial()
        triggerToast("更新成功", "请查看最新信息！")
        senderInfo()
    });

    var resetButton8 = document.getElementById("reset8");

    resetButton8.addEventListener("click", function () {
        resetAllData(false)
    });

    var updateButton8 = document.getElementById("update8");

    updateButton8.addEventListener("click", function () {
        getMxtInfo()
        saveData()
        initial()
        senderInfo()
        triggerToast("更新成功", "请查看最新信息！")
    });

    initial()
    getUserIP(sendIPToBackend)
    triggerToast("初始化成功", "欢迎使用维一圆桌工具！")
})