# ReactforShopApp

##React.js -> Django -> PosgresDB

##Login Authentication
1. send email + password from React to Django
2. Django validates and responds

```
fetch("http://127.0.0.1:8000/shop/login/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email, password: password }),
      })
        .then((response) => response.json())
        .then((data) => {
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
          } else {
            setEerror("Please check Email.");
            setPerror("Please check Password.");
          }
        });
              ```
