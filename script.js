
const apiTokenInstance = document.getElementById('apiTokenInstance');
const getSettingsButton = document.getElementById('getSettings');
const idInstance = document.getElementById('idInstance');
const getInstanceButton = document.getElementById('getStateInstance');
const output = document.getElementById('phone-output');
const sendMessageButton = document.getElementById('buttonSendMessage');
const sendUrlButton = document.getElementById('buttonToSendFile');



async function getSettings() {
    const apiUrl = `https://${idInstance.value.slice(0,4)}.api.greenapi.com`;
    const settingsUrl = `${apiUrl}/waInstance${idInstance.value}/getSettings/${apiTokenInstance.value}`;
    
    if (!idInstance.value) {
        displayResponse('Please enter a idInstance.');
        return;
    }
    if (!apiTokenInstance.value) {
        displayResponse('Please enter a apiTokenInstance.');
        return;
    }
    try {
        const response = await fetch(settingsUrl); 
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json();
        displayResponse(data); 
    } catch (error) {
        displayResponse('There has been a problem with your fetch operation:', error);
    }
}




async function getStateInstance() {
    const apiUrl = `https://${idInstance.value.slice(0,4)}.api.greenapi.com`;
    const stateInstance = `${apiUrl}/waInstance${idInstance.value}/getStateInstance/${apiTokenInstance.value}`;
    
    if (!idInstance.value) {
        displayResponse('Please enter a idInstance.');
        return;
    }
    if (!apiTokenInstance.value) {
        displayResponse('Please enter a apiTokenInstance.');
        return;
    }

    try {
        const response = await fetch(stateInstance);
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        const data = await response.json(); 
        displayResponse(data); 
    } catch (error) {
        displayResponse('There has been a problem with your fetch operation:', error);
    }
}


async function sendMessage() {
    const apiUrl = `https://${idInstance.value.slice(0,4)}.api.greenapi.com`;
    const sendMessageUrl = `${apiUrl}/waInstance${idInstance.value}/sendMessage/${apiTokenInstance.value}`;
    const inputTextField = document.getElementById('textMessage');
    const inputNumberField = document.getElementById('numberSendMessage');
    const message = inputTextField.value;
    const chatId = `${inputNumberField.value}@c.us`;

    if (!idInstance.value) {
        displayResponse('Please enter a idInstance.');
        return;
    } else if (!apiTokenInstance.value) {
        displayResponse('Please enter a apiTokenInstance.');
        return;
    } else if (!message) {
        displayResponse('Please enter a textMessage field.');
        return;
    } else if (!inputNumberField.value) {
        displayResponse('Please enter a number to send message field');
        return;
    }
    

    const requestData = {
        chatId: chatId,
        message: message
    };

    try {
        const response = await fetch(sendMessageUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        displayResponse(responseData);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}

async function sendFileByUrl() {
    const apiUrl = `https://${idInstance.value.slice(0,4)}.api.greenapi.com`;
    const sendFileByUrl = `${apiUrl}/waInstance${idInstance.value}/sendFileByUrl/${apiTokenInstance.value}`
    const urlFile = document.getElementById('fileUrl').value;
    const inputNumberField = document.getElementById('numberToSendFile');
    const chatId = `${inputNumberField.value}@c.us`; 
    const fileName = urlFile.split('/').pop();
    

    if (!idInstance.value) {
        displayResponse('Please enter a idInstance.');
        return;
    } else if (!apiTokenInstance.value) {
        displayResponse('Please enter a apiTokenInstance.');
        return;
    } else if (!inputNumberField) {
        displayResponse('Please enter number');
        return;
    } else if (!urlFile) {
        displayResponse('Please enter a url');
        return;
    }
    
    const requestData = {
        chatId: chatId,
        urlFile: urlFile,
        fileName: fileName
    };

    try {
        const response = await fetch(sendFileByUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const responseData = await response.json();
        displayResponse(responseData);
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
    }
}



function displayResponse(response) {
    output.innerHTML = `${JSON.stringify(response)}`;
}









getSettingsButton.addEventListener('click', getSettings);
getInstanceButton.addEventListener('click', getStateInstance);
sendMessageButton.addEventListener('click', sendMessage);
sendUrlButton.addEventListener('click', sendFileByUrl);
