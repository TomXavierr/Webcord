class JWTAuthMiddleWare:
    def __init__(self, app):
        self.app = app
    
    async def __call__(self, scope, recieve, send):
        headers_dict = dict(scope["headers"])

        print(headers_dict)

        return await self.app(scope, recieve, send)