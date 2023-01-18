export default () => {
  console.log('proxy');

  interface User {
    name: string;
    isUser: boolean;
  }
  const user: User = {
    name: 'aldo',
    isUser: true,
  };

  const handler: ProxyHandler<User> = {
    get: function (target, prop, receiver) {
      return Reflect.get(...arguments);
    },
  };

  const proxiedUser = new Proxy(user, handler);
  console.log(proxiedUser.isUser);

  const sum = (a, b) => a + b;

  const handlerFn: ProxyHandler<any> = {
    apply: (target, thisArg, argumentsList) => {
      console.log(`Calculate sum: ${argumentsList}`);
      // Expected output: "Calculate sum: 1,2"

      return target(argumentsList[0], argumentsList[1]) * 10;
    },
  };
  const functionProxy = new Proxy(sum, handlerFn);
  console.log(functionProxy(5, 2));
  // console.log(proxiedUser);
};
