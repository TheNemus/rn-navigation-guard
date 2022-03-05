import * as React from 'react';
import { useNavigation } from '@react-navigation/native';
export function NavigationGuard(_ref) {
  let {
    children
  } = _ref;
  const canBlur = React.useRef(true);
  const navigation = useNavigation();
  const navigationStartCallback = React.useRef();
  const askedForNavigationCallback = React.useRef();

  async function navigate(target, params) {
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

  function setAskedForNavigationCallback(fn) {
    askedForNavigationCallback.current = fn;
  }

  function setNavigationStartCallback(fn) {
    navigationStartCallback.current = fn;
  }

  function setCanBlur(arg) {
    canBlur.current = !!arg;
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, children({
    navigate,
    setAskedForNavigationCallback,
    setNavigationStartCallback,
    setCanBlur
  }));
}
//# sourceMappingURL=index.js.map