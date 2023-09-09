
const DOMStrings = {
    buyPrice: 'buyPrice',
    sellPrice: 'sellPrice',
    investmentAmount: 'investmentAmount',
    buyingFee: 'buyingFee',
    buyingFeeSelect: 'buyingFeeSelect',
    sellingFee: 'sellingFee',
    sellingFeeSelect: 'sellingFeeSelect',
    resultPNL: 'resultPNL',
    resultROE: 'resultROE',
    positionType: 'positionType',
    leverageAmount: 'leverageAmount',
    investmentLeverage: 'investmentLeverage',
    entryPrice: 'entryPrice',
    exitPrice: 'exitPrice',
    leverageResultDollar: 'leverageResultDollar',
    leverageResultPercent: 'leverageResultPercent',
    languageSelect: 'languageSelect'
};

function setElementTextColor(elementId, color) {
    document.getElementById(elementId).style.color = color;
}

function getFeeValue(inputId, selectId) {
    let fee = parseFloat(document.getElementById(inputId).value);
    return isNaN(fee) ? parseFloat(document.getElementById(selectId).value) / 100 : fee / 100;
}

function calculateProfitLoss() {
    const buyPrice = parseFloat(document.getElementById(DOMStrings.buyPrice).value);
    const sellPrice = parseFloat(document.getElementById(DOMStrings.sellPrice).value);
    const investmentAmount = parseFloat(document.getElementById(DOMStrings.investmentAmount).value);
    
    const buyingFee = getFeeValue(DOMStrings.buyingFee, DOMStrings.buyingFeeSelect);
    const sellingFee = getFeeValue(DOMStrings.sellingFee, DOMStrings.sellingFeeSelect);
    
    const totalBuyingFee = investmentAmount * buyingFee;
    const profitLoss = (investmentAmount / buyPrice) * (sellPrice - buyPrice) - totalBuyingFee - (investmentAmount / buyPrice) * sellPrice * sellingFee;
    const ROE = (profitLoss / investmentAmount) * 100;
    
    document.getElementById(DOMStrings.resultPNL).innerText = `Profit/Loss ($): $${profitLoss.toFixed(2)}`;
    document.getElementById(DOMStrings.resultROE).innerText = `ROE (%): ${ROE.toFixed(2)}%`;
    
    const color = profitLoss < 0 ? 'blue' : profitLoss > 0 ? 'red' : '#FFFFFF';
    setElementTextColor(DOMStrings.resultPNL, color);
    setElementTextColor(DOMStrings.resultROE, color);
}

function updateInputValue(inputId, value) {
    const inputElement = document.getElementById(inputId);
    if (value === "custom") {
        inputElement.style.display = "block";
    } else {
        inputElement.style.display = "none";
        inputElement.value = value;
    }
}

function sharePNL() {
    const spotResultPNL = document.getElementById('resultPNL').innerText;
    const spotResultROE = document.getElementById('resultROE').innerText;
    const futureResultDollar = document.getElementById('leverageResultDollar').innerText;
    const futureResultPercent = document.getElementById('leverageResultPercent').innerText;
    
    let shareText;
    if (spotResultPNL) {
        shareText = spotResultPNL + '\n' + spotResultROE;
    } else {
        shareText = futureResultDollar + '\n' + futureResultPercent;
    }
    
    shareText += '\n\n' + window.location.href;

    copyToClipboard(shareText);
    alert('Your result and website link have been copied to the clipboard. Paste it wherever you like!');
}

function copyToClipboard(text) {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();

    try {
        document.execCommand('copy');
    } catch (err) {
        console.error('Failed to copy text: ', err);
    }

    document.body.removeChild(textArea);
}

function showTab(tabName, event) {
    var i, content, buttons;

    content = document.getElementsByClassName("content");
    for (i = 0; i < content.length; i++) {
        content[i].style.display = "none";
    }

    buttons = document.getElementsByClassName("tab-button");
    for (i = 0; i < buttons.length; i++) {
        buttons[i].className = buttons[i].className.replace(" active", "");
    }

    document.getElementById(tabName).style.display = "block";

    if (event) {
        event.currentTarget.className += " active";
    } else {
        if (tabName === "spot") {
            document.querySelector('.tab-button:nth-child(1)').className += " active";
        } else if (tabName === "future") {
            document.querySelector('.tab-button:nth-child(2)').className += " active";
        }
    }
}

function calculateLeverageProfitLoss() {
    const positionType = document.getElementById(DOMStrings.positionType).value;
    const leverage = parseFloat(document.getElementById(DOMStrings.leverageAmount).value);
    const investment = parseFloat(document.getElementById(DOMStrings.investmentLeverage).value);
    const entryPrice = parseFloat(document.getElementById(DOMStrings.entryPrice).value);
    const exitPrice = parseFloat(document.getElementById(DOMStrings.exitPrice).value);
    
    const profitLossDollar = positionType === "long" ? (exitPrice - entryPrice) * investment : (entryPrice - exitPrice) * investment;
    const IMR = 1 / leverage;
    const initialMargin = investment * entryPrice * IMR;
    const profitLossPercent = (profitLossDollar / initialMargin) * 100;
    
    document.getElementById(DOMStrings.leverageResultDollar).innerText = `Profit/Loss ($): $${profitLossDollar.toFixed(2)}`;
    document.getElementById(DOMStrings.leverageResultPercent).innerText = `ROE (%): ${profitLossPercent.toFixed(2)}%`;
    
    const color = profitLossDollar < 0 ? 'blue' : profitLossDollar > 0 ? 'red' : '#FFFFFF';
    setElementTextColor(DOMStrings.leverageResultDollar, color);
    setElementTextColor(DOMStrings.leverageResultPercent, color);
}

const languages = {
    en: {
        header: "coinvestFolio",
        spotTab: "Spot Calculator",
        futureTab: "Future Calculator",
        positionType: "Position Type:",
        long: "Long",
        short: "Short",
        leverage: "Leverage (e.g., 10 for 10x):",
        coinQuantity: "Coin Quantity:",
        entryPrice: "Entry Price ($):",
        exitPrice: "Exit Price ($):",
        buyPrice: "Buy Price ($)",
        sellPrice: "Sell Price ($)",
        investmentAmount: "Investment Amount ($)",
        buyingFee: "Buying Fee",
        sellingFee: "Selling Fee",
        calculate: "Calculate",
        sharePNL: "Share My PNL"
    },
    kr: {
        header: "코인베스트폴리오",
        spotTab: "현물 계산기",
        futureTab: "선물 계산기",
        positionType: "포지션 유형:",
        long: "롱",
        short: "숏",
        leverage: "레버리지 (예: 10은 10x):",
        coinQuantity: "코인 수량:",
        entryPrice: "진입 가격 ($):",
        exitPrice: "종료 가격 ($):",
        buyPrice: "구매 가격 ($)",
        sellPrice: "판매 가격 ($)",
        investmentAmount: "투자 금액 ($)",
        buyingFee: "구매 수수료",
        sellingFee: "판매 수수료",
        calculate: "계산하기",
        sharePNL: "PNL 공유하기"
    }
};

function changeLanguage() {
    const selectedLanguage = document.getElementById(DOMStrings.languageSelect).value;
    const lang = languages[selectedLanguage];

    document.querySelector('header').innerText = lang.header;
    document.querySelector('.tab-button:nth-child(1)').innerText = lang.spotTab;
    document.querySelector('.tab-button:nth-child(2)').innerText = lang.futureTab;
    document.querySelector('label[for="positionType"]').innerText = lang.positionType;
    document.querySelector('option[value="long"]').innerText = lang.long;
    document.querySelector('option[value="short"]').innerText = lang.short;
    document.querySelector('label[for="leverageAmount"]').innerText = lang.leverage;
    document.querySelector('label[for="investmentLeverage"]').innerText = lang.coinQuantity;
    document.querySelector('label[for="entryPrice"]').innerText = lang.entryPrice;
    document.querySelector('label[for="exitPrice"]').innerText = lang.exitPrice;
    document.querySelector('label[for="buyPrice"]').innerText = lang.buyPrice;
    document.querySelector('label[for="sellPrice"]').innerText = lang.sellPrice;
    document.querySelector('label[for="investmentAmount"]').innerText = lang.investmentAmount;
    document.querySelector('label[for="buyingFeeSelect"]').innerText = lang.buyingFee;
    document.querySelector('label[for="sellingFeeSelect"]').innerText = lang.sellingFee;
    document.querySelectorAll('button[onclick="calculateProfitLoss()"]')[0].innerText = lang.calculate;
    document.querySelectorAll('button[onclick="sharePNL()"]')[0].innerText = lang.sharePNL;
    document.querySelector('button[onclick="calculateLeverageProfitLoss()"]').innerText = lang.calculate;
}

window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    const sharedResult = urlParams.get('result');
    if (sharedResult) {
        document.getElementById('result').innerText = sharedResult;

        const profitLossValue = parseFloat(sharedResult.split('$')[1]);
        const resultElement = document.getElementById('result');
    
        if (profitLossValue < 0) {
            resultElement.style.color = 'blue';
        } else if (profitLossValue > 0) {
            resultElement.style.color = 'red';
        } else {
            resultElement.style.color = '#FFFFFF';
        }
    }
      
    showTab('spot');
};
