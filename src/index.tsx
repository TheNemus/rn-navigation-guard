import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  [key: string]: any;
};

export function NavigationGuard({children}: {children: any}) {
  const canBlur = React.useRef(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const navigationStartCallback = React.useRef<(arg?: string) => unknown>();
  const askedForNavigationCallback = React.useRef<(arg?: string) => unknown>();

  async function navigate(target: string, params?: any) {
    askedForNavigationCallback.current && askedForNavigationCallback.current(target);
    console.log('can-blur: ', canBlur.current);

    if (canBlur.current === true) {
      console.log('going to ' + target);
      if (canBlur.current === true) {
        console.log('exectuing navigationStart cb for ' + target);
        navigationStartCallback.current && (await navigationStartCallback.current());
        navigation.navigate(target, params);
      }
      canBlur.current = true;
    }
  }

  function setAskedForNavigationCallback(fn: (to: string) => void) {
    askedForNavigationCallback.current = fn;
  }

  function setNavigationStartCallback(fn: (to: string) => void) {
    navigationStartCallback.current = fn;
  }

  function setCanBlur(arg: boolean) {
    canBlur.current = !!arg;
  }

  return <>{children({navigate, setAskedForNavigationCallback, setNavigationStartCallback, setCanBlur})}</>;
}
