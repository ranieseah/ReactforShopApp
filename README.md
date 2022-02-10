# ReactforShopApp

## React.js -> Django -> PosgresDB

## Login Authentication



        4. Django returns access token

        6. Django returns user details
        7. set user details as userInfo

1. send email + password from React to Django to validate
```
fetch("http://127.0.0.1:8000/shop/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
```
2a. if Django validates and responds OK,
```
class AuthUser(APIView):
    def post(self, request):
        user = authenticate(email=request.data['email'], password=request.data['password'])
        if user is not None:
            return JsonResponse({"msg":"OK"})
        else:
            return JsonResponse({"msg":"Error - user not logged"})
```
3. send email + password from React to Django to request for access token, when it's returned, store in userInfo.
```
          if (data.msg === "OK") {
            fetch("http://127.0.0.1:8000/shop/user-token/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email: email, password: password }),
            })
              .then((response) => response.json())
              .then((data) => {
                props.setUserInfo({
                  token: data.access,
                });
```
4. Django returns access token
```
class UserTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls,user):
        token=super().get_token(user)
        return token
```
5. use user email to retrieve user details, store user details in userInfo, then route users and admins to their seperate pages.
```
                fetch("http://127.0.0.1:8000/shop/user/", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ email: email }),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    props.setUserInfo((prevState) => {
                      return {
                        ...prevState,
                        name: data.name,
                        isAdmin: data.is_admin,
                        id: data.id,
                      };
                    });
                    if (data.is_admin === true) {
                      history.push("/admin");
                    } else {
                      history.push("/");
                    }
                  });
              });
```
6. Django returns user details
```
class ViewUser(APIView):
    def post(self, request):
        users = Account.objects.get(email=request.data['email'])
        serializer = AccountSerializer(users, many=False)
        return Response(serializer.data)
```
2b. if Django had failed to validate, email and password must be incorrect.
```
          } else {
            setEerror("Please check Email.");
            setPerror("Please check Password.");
          }
        });
```
