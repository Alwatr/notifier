# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.1](https://github.com/Alwatr/notifier/compare/v2.0.0...v2.0.1) (2024-10-28)

### Code Refactoring

* rename api folder ([951731a](https://github.com/Alwatr/notifier/commit/951731a6dc61a7fbf2ef55f8ad71ef042c7f54e4)) by @AliMD

## [2.0.0](https://github.com/Alwatr/notifier/compare/v1.0.0...v2.0.0) (2024-10-28)

### Features

* getAuthBearer ([836ac0c](https://github.com/Alwatr/notifier/commit/836ac0cded9995689e7703927eb230faeb6c4830)) by @AliMD
* **notifier-api:** add a new route to create a category ([dc91839](https://github.com/Alwatr/notifier/commit/dc91839abf735c87f0cc07b891df6261669fd0d2)) by @mohammadhonarvar
* **notifier-api:** Add parseBodyAsJson handler ([2cf2b13](https://github.com/Alwatr/notifier/commit/2cf2b13a6570879b50ad1007a87c14f0c8357edb)) by @AliMD
* **notifier-api:** start the bot & handle errors ([3f24b61](https://github.com/Alwatr/notifier/commit/3f24b61a079dd3dbfce79186f33987c6a4e4229e)) by @mohammadhonarvar
* **notifier-api:** use `AlwatrHashGenerator` ([0cbdca7](https://github.com/Alwatr/notifier/commit/0cbdca76cd7e3eaa1d1b5e38dcfd4c7c31babd16)) by @mohammadhonarvar
* **notifier-api:** use `hashGenerator` & save data ([572fe39](https://github.com/Alwatr/notifier/commit/572fe39d33a9c7ec0a47d00618fb2a6f6c9a9b43)) by @mohammadhonarvar
* requireAccessToken handler ([6b0961b](https://github.com/Alwatr/notifier/commit/6b0961b91e0a2f0238b3c1346e9406af93abef34)) by @AliMD
* use `getEnv` to read `env`s ([#253](https://github.com/Alwatr/notifier/issues/253)) ([64c2ce0](https://github.com/Alwatr/notifier/commit/64c2ce0e933bd6dff9fd96367073a639262c4795)) by @mohammadhonarvar

### Bug Fixes

* **api:** package name ([59b313b](https://github.com/Alwatr/notifier/commit/59b313bcec46dfaa2385fbe7265c54f41aa3a111)) by @AliMD
* **notifier-api:** add missing `/` for routes ([91fc2e9](https://github.com/Alwatr/notifier/commit/91fc2e95d354b664d096ea06d113b4b0ae0c9edf)) by @mohammadhonarvar
* review amd fix routes ([f57a0eb](https://github.com/Alwatr/notifier/commit/f57a0eb622308e62329612793ced3f55901b5700)) by @AliMD

### Code Refactoring

* **config:** cleanup ([a6353d6](https://github.com/Alwatr/notifier/commit/a6353d6ef645f020cbc3e11f64b2ed85e8c19f4a)) by @AliMD
* **db:** review and enhance ([f32868e](https://github.com/Alwatr/notifier/commit/f32868eb5465e7fc651a633be36f9bcd1916b978)) by @AliMD
* **new-category:** rewrite new category route ([f83c301](https://github.com/Alwatr/notifier/commit/f83c301211c97cf8fd3ed0594a84d641798cfcb2)) by @AliMD
* **notifier-api:** add some pre-handlers & complete the process of `notify` route & cleanup codes ([458be1d](https://github.com/Alwatr/notifier/commit/458be1db74c3ae612833e520204feac92482c222)) by @mohammadhonarvar
* **notifier-api:** copy path in `Dockerfile` ([0272483](https://github.com/Alwatr/notifier/commit/0272483af9e5adc165f4a7c95639c8adedcbc468)) by @mohammadhonarvar
* **notifier-api:** import `pre-handlers` from `nanotorn` ([98f1cc6](https://github.com/Alwatr/notifier/commit/98f1cc6471791f96fe6b40d94f9c97a80c3a0990)) by @mohammadhonarvar
* **notifier-api:** Refactor bot.ts and main.ts ([f09d1fd](https://github.com/Alwatr/notifier/commit/f09d1fd78dfb9d38f55beef297ca48e521a78ae4)) by @AliMD
* **notifier-api:** Remove unused hashGenerator ([9c270f7](https://github.com/Alwatr/notifier/commit/9c270f7e7f8fd6629a52203c830d5c13154c6f7b)) by @AliMD
* **notifier-api:** rename all `group`s to `category` ([56901b0](https://github.com/Alwatr/notifier/commit/56901b0e79f7e1ec0cb937e7c3f53e7c6376553f)) by @mohammadhonarvar
* **notifier-api:** rename all `group`s to `category` ([2db1baf](https://github.com/Alwatr/notifier/commit/2db1baf888b390496c29049e6c5c137d3042302f)) by @mohammadhonarvar
* **notifier-api:** rename nitrobase ([71d459a](https://github.com/Alwatr/notifier/commit/71d459a6b8b2a08ff26936b7bed177e64314b115)) by @AliMD
* **notifier-api:** Rename package to "telegram-notifier" ([5be8cfe](https://github.com/Alwatr/notifier/commit/5be8cfe61ea9d50664db6483c6d292a3af54dec6)) by @AliMD
* **notifier-api:** rewrite notify route ([cead5b1](https://github.com/Alwatr/notifier/commit/cead5b121c7715bca14075407651c460ace0e46a)) by @AliMD
* **notifier-api:** Update bot start method and error handling ([3d1f585](https://github.com/Alwatr/notifier/commit/3d1f585322fa834d8aea7c20132aa8c2a636f46c)) by @AliMD
* **notifier-api:** Update config.ts to use telegramBot instead of bot ([ac3eaf9](https://github.com/Alwatr/notifier/commit/ac3eaf9e2243e3cdc1515e6fda1eb22647ce8f3b)) by @AliMD
* **notifier-api:** Update escapeMessage function to use regex for character escaping ([254fa35](https://github.com/Alwatr/notifier/commit/254fa3599a50a2b8df015d217600d5a353da2035)) by @AliMD
* **notifier-api:** Update home route to return JSON response ([7ec4e0e](https://github.com/Alwatr/notifier/commit/7ec4e0e274fd45741793181d939b9817354b17f2)) by @AliMD
* **notifier-api:** Update i18n message function and resource keys ([c02db00](https://github.com/Alwatr/notifier/commit/c02db00df9f472b7a4a0c03be49b2b1115f48f78)) by @AliMD
* **notifier-api:** Update import path for config in server.ts ([abe1171](https://github.com/Alwatr/notifier/commit/abe117126574ae6e33f40c1fc0aa77ea7537f4a7)) by @AliMD
* **notifier-api:** Update import path for nitrobase in nitrobase.ts ([5e3ef41](https://github.com/Alwatr/notifier/commit/5e3ef410a4300c778cd1f810ecd95240b67ca8a0)) by @AliMD
* **notifier-api:** Update notify-validation handler to validate category and message inputs ([64be082](https://github.com/Alwatr/notifier/commit/64be0820cadcdba26f372974898708d76fb2cc1b)) by @AliMD
* **notifier-api:** Update notifyRoute to use notifyValidation and notifyTelegram ([09a4a6d](https://github.com/Alwatr/notifier/commit/09a4a6dfad4567b0a427f77344784e6ede809a94)) by @AliMD
* **notifier-api:** Update notifyTelegram function to send messages to all members of a category ([f0a6847](https://github.com/Alwatr/notifier/commit/f0a6847299f5305661dc4cc17ab036b2ea1b5864)) by @AliMD
* **notifier-api:** Update parseBodyAsJson handler to use JsonObject type ([baadde0](https://github.com/Alwatr/notifier/commit/baadde00ebb41038f0a650c664a1907fc40ba4a0)) by @AliMD
* **notifier-api:** update requireAccessToken function ([9a1c02c](https://github.com/Alwatr/notifier/commit/9a1c02caa6c7b6cd55b9b16942734069e91a8eb9)) by @AliMD
* **notifier-api:** Update start-command to add user to category members list ([98db565](https://github.com/Alwatr/notifier/commit/98db565650d0b8e3714ebabf8358de9b2637bd47)) by @AliMD
* **notifier-api:** Update type definitions for Category, Member, and NotifyOption ([a1b5d35](https://github.com/Alwatr/notifier/commit/a1b5d35c438496c0c2ab202431c1c2048a85d62b)) by @AliMD
* **notify:** review and enhance ([adb18f5](https://github.com/Alwatr/notifier/commit/adb18f55a5c6d7dd0525a80762cc448212ad10b5)) by @AliMD
* **packages:** rename `telegram` to `notifier-api` ([a01c9a1](https://github.com/Alwatr/notifier/commit/a01c9a1ff66d2ed476aaab8972aaa33f028a6829)) by @mohammadhonarvar
* rename files ([da6b6e9](https://github.com/Alwatr/notifier/commit/da6b6e9c86a2b85872b6683508f366633aa1084b)) by @AliMD
* rename files and cleaup ([93bb419](https://github.com/Alwatr/notifier/commit/93bb4192a06ffeb13cbd0c92f08f219cffd257a1)) by @AliMD
* **start-command:** review and enhance ([2a3cbd0](https://github.com/Alwatr/notifier/commit/2a3cbd0c7b402f900ab4e1e91bd5623a6059f1c3)) by @AliMD

### Miscellaneous Chores

* cleanup ([c59925d](https://github.com/Alwatr/notifier/commit/c59925d05f00d7c51c3c840a0f580d41c7ba232f)) by @AliMD
* cleanup ([e5af06e](https://github.com/Alwatr/notifier/commit/e5af06e73a335b06fb1d8d9de9493486298b2358)) by @AliMD
* **notifier-api:** cleanup ([9aec891](https://github.com/Alwatr/notifier/commit/9aec8917a60368301f927ff4f4ae0b1b555b1cb7)) by @mohammadhonarvar
* **notifier-api:** update `demo.http` ([9a72110](https://github.com/Alwatr/notifier/commit/9a721102f785f2e5f053f713d19528d25065cddf)) by @mohammadhonarvar

## [1.0.1](https://github.com/Alwatr/notifier/compare/v1.0.0...v1.0.1) (2023-06-21)

**Note:** Version bump only for package @alwatr/telegram-notify

# [1.0.0](https://github.com/Alwatr/notifier/compare/v0.32.0...v1.0.0) (2023-06-14)

### Features

- review and cleanup all workflows ([fff7e92](https://github.com/Alwatr/notifier/commit/fff7e92c5d85a79adcc975802b949a9dc61d2ba3))

# [0.32.0](https://github.com/Alwatr/notifier/compare/v0.31.0...v0.32.0) (2023-05-27)

**Note:** Version bump only for package @alwatr/telegram-notify

# [0.31.0](https://github.com/Alwatr/notifier/compare/v0.30.0...v0.31.0) (2023-05-08)

### Bug Fixes

- new logger api ([9d83a7d](https://github.com/Alwatr/notifier/commit/9d83a7dc5c103bc3bb4282dacfd85fa998915300))
- **telegram-notifier:** escaping send message ([a9814bf](https://github.com/Alwatr/notifier/commit/a9814bfca41c1260d5de7ec75e2356b3cdcbbc9d))

# [0.30.0](https://github.com/Alwatr/notifier/compare/v0.29.0...v0.30.0) (2023-03-06)

### Bug Fixes

- **telegram-notifier:** escaping special characters on sendMessage ([5507d6d](https://github.com/Alwatr/notifier/commit/5507d6dd460201979b7ee3bb1ae255e572b7cf0d))

# [0.29.0](https://github.com/Alwatr/notifier/compare/v0.28.0...v0.29.0) (2023-02-10)

### Bug Fixes

- **typescript:** rollback to 4.9.5 ([cc30f85](https://github.com/Alwatr/notifier/commit/cc30f8502bf95868ff41ba986120b2842acba36b))

# [0.28.0](https://github.com/Alwatr/notifier/compare/v0.27.0...v0.28.0) (2023-01-20)

### Bug Fixes

- **services:** app name in home page ([6feab58](https://github.com/Alwatr/notifier/commit/6feab58b5655c7a09150ec83adf9f3bd8fe976b4))
- **services:** name and desc ([453c1b6](https://github.com/Alwatr/notifier/commit/453c1b6ff334a23bea690b7ff9dd874471b25bb9))
- **services:** service name in first log ([879f87f](https://github.com/Alwatr/notifier/commit/879f87fd4d4b47454d608a5b71d70e47601c7cd7))
- version in package.json ([403baa5](https://github.com/Alwatr/notifier/commit/403baa53159db2a0fff5b3651769b85e66b13191))

### Features

- **type:** define constructor type ([39c5ab7](https://github.com/Alwatr/notifier/commit/39c5ab74f0a1471d5e20beff89f6885265907633))

# [0.27.0](https://github.com/Alwatr/notifier/compare/v0.26.0...v0.27.0) (2022-12-29)

**Note:** Version bump only for package @alwatr/telegram-notify

# [0.26.0](https://github.com/Alwatr/notifier/compare/v0.25.0...v0.26.0) (2022-12-22)

### Bug Fixes

- add esbuild to git ignore ([46b3714](https://github.com/Alwatr/notifier/commit/46b3714a4b578b6cfae9e2d17f8c39623470c1f5))
- all import without .js ([fa739ab](https://github.com/Alwatr/notifier/commit/fa739ab23f67bae1d10bfcc146920b71377a26fc))
- clean command ([14bafbb](https://github.com/Alwatr/notifier/commit/14bafbb01b3c92ccf516346a4e5117f1893c32e9))
- crawler loop ([72951f9](https://github.com/Alwatr/notifier/commit/72951f904c8e8eb04ded2a485a65add99150f984))
- inline home route ([94279c2](https://github.com/Alwatr/notifier/commit/94279c21891fc710f48642b1c8debbf02b2436d3))
- inline home route ([ce978f6](https://github.com/Alwatr/notifier/commit/ce978f6e1e2890e853d0db351c08efca665e5fad))
- package.json script ([e633a8c](https://github.com/Alwatr/notifier/commit/e633a8c4355bec0d2fc044f073f7f639c0fd1976))
- remove lint dependencies from services ([f047a5b](https://github.com/Alwatr/notifier/commit/f047a5bb0d1e8277f48b55969e18dc3582d9a234))
- services serve script ([3c62e06](https://github.com/Alwatr/notifier/commit/3c62e06ec594ec7da171fc39ec77787e3bd29a0c))
- **services/telegram-notifier:** remove await out of fucntion ([283b58b](https://github.com/Alwatr/notifier/commit/283b58b0ebf8a9c01805e1aa6ee8222933b9dbc7))
- **services/telegram-notifier:** remove storga-client ([c27f992](https://github.com/Alwatr/notifier/commit/c27f9927b97f4d6f2e9c78d5a0a3f0268275bc38))
- **services/telegram-notifier:** set stroage name in config ([010fa71](https://github.com/Alwatr/notifier/commit/010fa71cf15698bffcc5378b252bd0aa564d8d6e))
- **telegram-notifier:** build ([ecce1df](https://github.com/Alwatr/notifier/commit/ecce1df81642b329dfb863d0503c06fc40688550))
- **telegram-notifier:** folder ([8bb0b01](https://github.com/Alwatr/notifier/commit/8bb0b016502f6e2c5b1dd588e8300d36eb24eba7))
- **telegram-notifier:** lanch fail ([413b5fc](https://github.com/Alwatr/notifier/commit/413b5fc3753304fe3c7e3e4ff574040fe3395ae8))
- **telegram-notifier:** prevent duplicate register ([4f41f4c](https://github.com/Alwatr/notifier/commit/4f41f4c6cca881f0fc90cc253d8d6eaa15a50c43))
- tsconfig refrences ([cea0562](https://github.com/Alwatr/notifier/commit/cea05621ecfa499476c5b10a412e60f27ba6a06d))
- update reply nano-server ([5a2d0e5](https://github.com/Alwatr/notifier/commit/5a2d0e5698b16cffcc5393ee4a44ffda66702425))

### Features

- esbuild (: ([43c7269](https://github.com/Alwatr/notifier/commit/43c7269333cf71b142e26da1456446d42fb3f8e0))
- **flight-crawler:** run infinite ([a0185bc](https://github.com/Alwatr/notifier/commit/a0185bc39eab40862e0621ae703f604b30998991))
- improve error debugging ([1fba504](https://github.com/Alwatr/notifier/commit/1fba50400a1e8ececc10bbe8ea11cc8dcea2289c))
- launchBot ([b3990f9](https://github.com/Alwatr/notifier/commit/b3990f92bba1b65d0e728615f701a4799619d821))
- move some depndencies to devDependencies ([4e9576e](https://github.com/Alwatr/notifier/commit/4e9576e6fd55f361e08a54230931ad45832131d9))
- new build process ([aa23ed2](https://github.com/Alwatr/notifier/commit/aa23ed256824b9b4409e51a3213d6e67f2aeb8a3))
- **services/telegram-notifier:** dynamic storage path ([9f59240](https://github.com/Alwatr/notifier/commit/9f5924008d7b567af1c990450da2450af887404a))
- **telegram-notifier:** esbuild config ([b1ca298](https://github.com/Alwatr/notifier/commit/b1ca298df482daddfab4d89e807c4c5654394245))
