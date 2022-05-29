getData();
function getData() {
    fetch("./data.json")
        .then(res => res.json())
        .then(d => { return d; })
        .then(r => createCharts(r));
}
function createCharts(array) {
    array.forEach(e => {
        let html = `
    <div class="chart">
    <div class="day">${e.day}</div>
    <div class="graph">
    <div class="amount" data-amount="${e.amount}">$${e.amount}</div>
    </div>
    </div>
`;
        document.querySelector('.charts').innerHTML += html;
    });

    const charts = document.querySelectorAll('.graph');
    charts.forEach(chart => {
        const amountEle = chart.querySelector('.amount').textContent;
        chart.style.height = `${amountEle.substring(1) * 1.1}%`;
    });
    let bigOne = [];
    let total = 0;
    const Allamount = document.querySelectorAll('.graph .amount');
    Allamount.forEach(e => {
        bigOne.push(e.textContent.substring(1));
        total = (total += +e.textContent.substring(1));
    });
    document.querySelector('.body .total').innerHTML = `$${total}`;
    bigOne = getMaxNumFromArray(bigOne);
    document.querySelector(`.graph .amount[data-amount="${bigOne}"]`).parentElement.classList.add('max');

};
function getMaxNumFromArray(array) {
    let max = 0;
    for (let i = 0; i < array.length; i++) {
        if (max < array[i]) {
            max = array[i];
        }
    }
    return max;
}