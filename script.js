
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

// ... [Rest of the functions remain the same]

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

// ... [Rest of the functions remain the same]

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

