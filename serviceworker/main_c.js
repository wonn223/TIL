const appPublicKey = 'BCW6JPG-T7Jx0bYKMhAbL6j3DL3VTTib7dwvBjQ' +
'C_496a12auzzKFnjgFjCsys_YtWkeMLhogfSlyM0CaIktx7o';
const pushButton = document.querySelector('.js-push-btn');

// 서비스 워커 구독 여부
let isSubscribed = false;

// 서비스 워커 등록 정보
let swRegistration = null;

if('serviceWorker' in navigator && 'PushManager' in window ) {

    window.addEventListener('load', function(){
        navigator.serviceWorker.register('sw.js')
        .then(function(registration){
            // registration
            swRegistration = registration;
            console.log('registration success / scope', registration.scope);
            initializeUI();
        }).catch(function(err){
            console.log('registration failed', err);
        })
    })
} else {
    console.warn('push messaging is not supported');
    pushButton.textContent = 'Push not supported';
}

// UI 초기화 하기
// 사용자의 구독 상태 파악
function initializeUI() {
    pushButton.addEventListener('click', function(){
        pushButton.disabled = true;
        if(isSubscribed){
        } else {
            subscribeUser();
        }
    })

    swRegistration.pushManager.getSubscription()
    .then(function(subscription){
        isSubscribed = !(subscription === null);

        updateSubscriptionOnServer(subscription);

        if(isSubscribed) {
            console.log('User is subscribed');
        } else {
            console.log('User is NOT subscribed');
        }

        updateBtn();
    });
}

// 구독 여부에 따라 버튼 UI변경
function updateBtn() {
    // if(Notification.permission === 'denied'){
    //     pushButton.textContent = 'Push Message Blocked';
    //     pushButton.disabled = true;
    //     updateSubscriptionOnServer(null);
    //     return;
    // }

    if(isSubscribed) {
        pushButton.textContent = 'Disable Push Messaging';
    } else {
        pushButton.textContent = 'Enable Push Messaging';
    }
    pushButton.disabled = false;
}

function updateSubscriptionOnServer(subscription) {
    // TODO: Send subscription to application server
    const subscriptionJson = document.querySelector('.js-subscription-json');
    const subscriptionDetails = document.querySelector('.js-subscription-details');
    
    if (subscription) {
      subscriptionJson.textContent = JSON.stringify(subscription);
      subscriptionDetails.classList.remove('is-invisible');
    } else {
      subscriptionDetails.classList.add('is-invisible');
    }
}

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
      .replace(/\-/g, '+')
      .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

function subscribeUser() {
    const applicationServerKey = urlB64ToUint8Array(appPublicKey);
    swRegistration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: applicationServerKey
    }).then(function(subscription){
        console.log('user is subscribed', subscription);

        updateSubscriptionOnServer(subscription);

        isSubscribed = true;

        updateBtn();
    }).catch(function(err){
        console.log('failed to subscribe the user', err);
        updateBtn();
    })
}