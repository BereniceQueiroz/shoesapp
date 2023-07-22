import OneSignal from "react-native-onesignal";

export function tagUserEmailCreate(email: string) {
  OneSignal.sendTag('user_email', email);
}

export function deleteTagUserEmailCreate() {
  OneSignal.deleteTag('user_email');
}

export function tagUserInfoCreate() {
  OneSignal.sendTags({
    'user_name': 'Berenice',
    'user_email': 'baqueiroz14@gmail.com'
  });
}

export function tagCartUpdate(itemsCount: string) {
  OneSignal.sendTag('cart_itens_count', itemsCount );
}

