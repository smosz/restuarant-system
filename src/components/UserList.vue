<template>
  <div class="bgColor">
    <div class="max-w-screen-lg mx-auto py-6">
      <div class="bg-white rounded-lg shadow-lg px-6 pt-6 tab">
        <div class="flex justify-between items-center mb-4 no-print">
          <h2 class="text-2xl font-semibold">User List</h2>
          <button @click="openUserRegistrationModal"
            class="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            <div class="flex items-center">
              <Icon icon="majesticons:plus-line" />
              <span class="pl-2">Register User</span>
            </div>
          </button>
        </div>

        <div class="mt-2 mb-4 flex items-center font-['monospace'] space-x-2 justify-between no-print">
          <div class="flex items-center">
            <!-- Search input field -->
            <input v-model="searchQuery" type="text" class="search-input" @keyup.enter="searchUsers"
              placeholder="Search users..." />
          </div>
          <div class="flex ml-auto">
            <Icon icon="vscode-icons:file-type-pdf2" @click="exportToPDF" class="mx-2 cursor-pointer" :height="30" />
            <Icon icon="vscode-icons:file-type-excel2" @click="exportToExcel" class="mx-2 cursor-pointer" :height="30" />
            <Icon icon="flat-color-icons:print" @click="printTable" class="mx-2 cursor-pointer" :height="30" />
          </div>
        </div>

        <table id="User-table" class="min-w-full border-collapse border border-gray-300">
          <!-- Table header -->
          <thead>
            <tr>
              <th class="py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center justify-center">
                  <span>Username</span>
                </div>
              </th>
              <th class="py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center justify-center">
                  <span>User Email</span>
                </div>
              </th>
              <th class="py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center justify-center">
                  <span>Gender</span>
                </div>
              </th>
              <th class="py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center justify-center">
                  <span>Phone Number</span>
                </div>
              </th>
              <!-- <th
                class=" py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                <div class="flex items-center justify-center">
                  <span>Password</span>
                </div>
              </th> -->
              <th class="py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center justify-center">
                  <span>Role</span>
                </div>
              </th>
              <th class="py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center justify-center">
                  <span>Last Login</span>
                </div>
              </th>
              <th class="py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center justify-center">
                  <span>Last Signout</span>
                </div>
              </th>
              <th class="py-3 bg-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <div class="flex items-center justify-center">
                  <span>Status</span>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in paginatedUsers" :key="user.id" class="text-center">
              <!-- Edit buttons -->
              <td class="py-4 border border-gray-300">
                <div v-if="!user.isEditingUsername">
                  <span class="block">{{ user.Username }}</span>

                  <button 
                    @click="editUsername(user)"><svg xmlns="http://www.w3.org/2000/svg"
                      enable-background="new 0 0 512 512" viewBox="0 0 512 512" width="20" height="20">
                      <polygon fill="#eff3f5" points="282 2 2 2 2 510 395.3 510 395.3 115.3" class="colorEFF3F5 svgShape">
                      </polygon>
                      <polygon fill="#dbdfe0" points="282 115.3 395.3 115.3 282 2" class="colorDBDFE0 svgShape"></polygon>
                      <rect width="179.9" height="30.1" x="62.2" y="85.2" fill="#5ac8ae" class="color5AC8AE svgShape">
                      </rect>
                      <rect width="272.9" height="30.1" x="62.2" y="169.3" fill="#dbdfe0" class="colorDBDFE0 svgShape">
                      </rect>
                      <rect width="272.9" height="30.1" x="62.2" y="253.4" fill="#dbdfe0" class="colorDBDFE0 svgShape">
                      </rect>
                      <rect width="272.9" height="30.1" x="62.2" y="337.5" fill="#dbdfe0" class="colorDBDFE0 svgShape">
                      </rect>
                      <rect width="272.9" height="30.1" x="62.2" y="417.3" fill="#dbdfe0" class="colorDBDFE0 svgShape">
                      </rect>
                      <rect width="35.7" height="232.3" x="295.6" y="165.1" fill="#fbd984"
                        transform="rotate(45.001 313.447 281.208)" class="colorFBD984 svgShape"></rect>
                      <rect width="35.7" height="232.3" x="295.6" y="165.1" fill="#fbd984"
                        transform="rotate(45.001 313.447 281.208)" class="colorFBD984 svgShape"></rect>
                      <rect width="35.7" height="232.3" x="320.8" y="190.3" fill="#f0b972"
                        transform="rotate(45.001 338.67 306.43)" class="colorF0B972 svgShape"></rect>
                      <rect width="35.7" height="232.3" x="346.1" y="215.5" fill="#e39a61"
                        transform="rotate(45.001 363.892 331.652)" class="colorE39A61 svgShape"></rect>
                      <polygon fill="#ffffff" points="294.4 426.4 218.7 350.7 184.7 428 217.1 460.4"
                        class="colorFFF svgShape"></polygon>
                      <path fill="#445c6c" d="M184.7,428l-16.6,37.6c-3.2,7.2,4.2,14.5,11.3,11.3l37.6-16.6L184.7,428z"
                        class="color445C6C svgShape"></path>
                      <path fill="#f1786b"
                        d="M504.6,190l-49.4-49.4c-7.2-7.2-19-7.2-26.2,0L383,186.5l75.7,75.7l45.9-45.9   C511.8,209,511.8,197.2,504.6,190z"
                        class="colorF1786B svgShape"></path>
                      <rect width="15.8" height="107" x="418.5" y="165.2" fill="#eff3f5"
                        transform="rotate(-45.001 426.372 218.733)" class="colorEFF3F5 svgShape"></rect>
                    </svg></button>
                </div>
                <div class="flex flex-col items-center" v-else>
                  <input class="w-[60%] text-center border-b border-blue-500 mb-2" v-model="user.editUsername" />
                  <div class="flex justify-evenly">
                    <button
                      class="mr-[25px]"
                      @click="saveUsername(user)"><svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                        stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 32 32" width="20"
                        height="20">
                        <path fill="url(#a)"
                          d="M26.792 10.518c0-.503-.108-.998-.313-1.435l-2.17-4.625C23.886 3.556 23.099 3 22.247 3H8.583C7.272 3 6.208 4.295 6.208 5.893v21.214C6.208 28.705 7.272 30 8.583 30h15.834c1.311 0 2.375-1.295 2.375-2.893V10.518z"
                          transform="matrix(1.26316 0 0 1.03704 -4.842 -1.111)"></path>
                        <path fill="url(#b)"
                          d="M22.857 25c0-1.657-1.023-3-2.286-3h-9.142c-1.263 0-2.286 1.343-2.286 3v5h13.714z"
                          transform="matrix(1.3125 0 0 1 -5 0)"></path>
                        <path fill="url(#c)" d="M22 25c0-1.657-1.151-3-2.571-3h-6.858C11.151 22 10 23.343 10 25v5h12z"
                          transform="matrix(1.16667 0 0 -1 -2.667 32)"></path>
                        <path fill-opacity=".1"
                          d="M19 27a1 1 0 0 0-1-1h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 1-1zm-4-14c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm5-11h-2v5a.997.997 0 0 0 1 1 .997.997 0 0 0 1-1V2z"
                          fill="#000000" class="color000 svgShape"></path>
                        <path fill="url(#d)" d="M20 16a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4z"></path>
                        <path fill="url(#e)" d="M18 16a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2z"></path>
                        <path fill="url(#f)"
                          d="M20 26c0-.552-.392-1-.875-1h-5.25c-.483 0-.875.448-.875 1s.392 1 .875 1h5.25c.483 0 .875-.448.875-1Z"
                          transform="matrix(1.14286 0 0 1 -2.857 0)"></path>
                        <path fill="url(#g)"
                          d="M20 2h-2v3.2c0 .212.105.416.293.566.187.15.442.234.707.234.265 0 .52-.084.707-.234A.729.729 0 0 0 20 5.2V2Z"
                          transform="matrix(1 0 0 1.25 1 -.5)"></path>
                        <defs>
                          <linearGradient id="a" x1="0" x2="1" y1="0" y2="0"
                            gradientTransform="matrix(.79167 -26.0357 21.375 .96429 15.708 29.036)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#803cf9" class="stopColor803cf9 svgShape"></stop>
                            <stop offset="1" stop-color="#ac6aff" class="stopColorac6aff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="b" x1="0" x2="1" y1="0" y2="0"
                            gradientTransform="matrix(0 -8 6.09524 0 16 30)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#a967ff" class="stopColora967ff svgShape"></stop>
                            <stop offset="1" stop-color="#ffffff" class="stopColorfff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="c" x1="0" x2="1" y1="0" y2="0"
                            gradientTransform="matrix(0 -8 -6.85714 0 16 30)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ffffff" class="stopColorfff svgShape"></stop>
                            <stop offset="1" stop-color="#be8cff" class="stopColorbe8cff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="d" x1="0" x2="1" y1="0" y2="0" gradientTransform="matrix(0 -8 8 0 16 20)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ac69ff" class="stopColorac69ff svgShape"></stop>
                            <stop offset=".5" stop-color="#d5b4ff" class="stopColord5b4ff svgShape"></stop>
                            <stop offset="1" stop-color="#ffffff" class="stopColorfff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="e" x1="0" x2="1" y1="0" y2="0" gradientTransform="matrix(0 -3 3 0 16 18)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#a25bff" class="stopColora25bff svgShape"></stop>
                            <stop offset="1" stop-color="#c89cff" class="stopColorc89cff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="f" x1="0" x2="1" y1="0" y2="0"
                            gradientTransform="matrix(0 -2 1.75 0 16.5 27)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#813df9" class="stopColor813df9 svgShape"></stop>
                            <stop offset="1" stop-color="#a967ff" class="stopColora967ff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="g" x1="0" x2="1" y1="0" y2="0" gradientTransform="matrix(0 -3.2 4 0 19 5.2)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#a25bff" class="stopColora25bff svgShape"></stop>
                            <stop offset="1" stop-color="#b983ff" class="stopColorb983ff svgShape"></stop>
                          </linearGradient>
                        </defs>
                      </svg></button>
                    <button 
                      @click="cancelEditUsername(user)">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><g transform="translate(0 -1028.362)" fill="#000000" class="color000 svgShape"><circle cx="657.054" cy="437.094" r="15.268" fill="#ef4c45" fill-rule="evenodd" transform="translate(-504.421 696.821) scale(.78596)" class="coloref4c45 svgShape"></circle><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-transform:none;block-progression:tb" fill="#df2209" d="M14.525 23.717a12 12 0 0 0 .686-.154 12 12 0 0 0 1.137-.38 12 12 0 0 0 1.095-.488 12 12 0 0 0 1.041-.597 12 12 0 0 0 .975-.698 12 12 0 0 0 .902-.793 12 12 0 0 0 .817-.877 12 12 0 0 0 .726-.955 12 12 0 0 0 .627-1.021 12 12 0 0 0 .522-1.08 12 12 0 0 0 .412-1.127 12 12 0 0 0 .26-1.016l-7.13-7.129A6.478 6.478 0 0 0 12 5.496a6.478 6.478 0 0 0-4.596 1.906A6.482 6.482 0 0 0 5.496 12a6.48 6.48 0 0 0 1.908 4.596l7.121 7.12z" color="#000" font-family="sans-serif" font-weight="400" transform="translate(0 1028.362)" class="colordf2209 svgShape"></path><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-transform:none;block-progression:tb" fill="#ffffff" d="M8.498 1.994c1.662 0 3.324.635 4.596 1.906a6.494 6.494 0 0 1 0 9.194 6.491 6.491 0 0 1-9.192 0 6.48 6.48 0 0 1-1.879-5.219A6.482 6.482 0 0 1 3.903 3.9a6.478 6.478 0 0 1 4.595-1.906zm2.467 3.522c-.001 0-.003 0-.004.002a.506.506 0 0 0-.342.152L8.496 7.79 6.375 5.67a.506.506 0 0 0-.357-.152c-.397-.002-.635.584-.35.859l2.121 2.121-2.121 2.121c-.383.368.34 1.09.707.707l2.121-2.12 2.123 2.12c.368.383 1.09-.34.707-.707l-2.12-2.121 2.12-2.121c.29-.278.04-.874-.361-.861Z" color="#000" font-family="sans-serif" font-weight="400" overflow="visible" transform="translate(3.503 1031.865)" class="colorfff svgShape"></path></g></svg>
                    </button>
                  </div>

                </div>
              </td>
              <td class="py-4 border border-gray-300">
                {{ user.Email }}
              </td>
              <td class="py-4 border border-gray-300">
                {{ user.Gender }}
              </td>
              <td class="py-4 border border-gray-300">
                <div v-if="!user.isEditingPhone">
                  <span class="block">{{ user.Phone_Number }}</span>
                  <button
                    @click="editPhone(user)"><svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512"
                      viewBox="0 0 512 512" width="20" height="20">
                      <polygon fill="#eff3f5" points="282 2 2 2 2 510 395.3 510 395.3 115.3" class="colorEFF3F5 svgShape">
                      </polygon>
                      <polygon fill="#dbdfe0" points="282 115.3 395.3 115.3 282 2" class="colorDBDFE0 svgShape"></polygon>
                      <rect width="179.9" height="30.1" x="62.2" y="85.2" fill="#5ac8ae" class="color5AC8AE svgShape">
                      </rect>
                      <rect width="272.9" height="30.1" x="62.2" y="169.3" fill="#dbdfe0" class="colorDBDFE0 svgShape">
                      </rect>
                      <rect width="272.9" height="30.1" x="62.2" y="253.4" fill="#dbdfe0" class="colorDBDFE0 svgShape">
                      </rect>
                      <rect width="272.9" height="30.1" x="62.2" y="337.5" fill="#dbdfe0" class="colorDBDFE0 svgShape">
                      </rect>
                      <rect width="272.9" height="30.1" x="62.2" y="417.3" fill="#dbdfe0" class="colorDBDFE0 svgShape">
                      </rect>
                      <rect width="35.7" height="232.3" x="295.6" y="165.1" fill="#fbd984"
                        transform="rotate(45.001 313.447 281.208)" class="colorFBD984 svgShape"></rect>
                      <rect width="35.7" height="232.3" x="295.6" y="165.1" fill="#fbd984"
                        transform="rotate(45.001 313.447 281.208)" class="colorFBD984 svgShape"></rect>
                      <rect width="35.7" height="232.3" x="320.8" y="190.3" fill="#f0b972"
                        transform="rotate(45.001 338.67 306.43)" class="colorF0B972 svgShape"></rect>
                      <rect width="35.7" height="232.3" x="346.1" y="215.5" fill="#e39a61"
                        transform="rotate(45.001 363.892 331.652)" class="colorE39A61 svgShape"></rect>
                      <polygon fill="#ffffff" points="294.4 426.4 218.7 350.7 184.7 428 217.1 460.4"
                        class="colorFFF svgShape"></polygon>
                      <path fill="#445c6c" d="M184.7,428l-16.6,37.6c-3.2,7.2,4.2,14.5,11.3,11.3l37.6-16.6L184.7,428z"
                        class="color445C6C svgShape"></path>
                      <path fill="#f1786b"
                        d="M504.6,190l-49.4-49.4c-7.2-7.2-19-7.2-26.2,0L383,186.5l75.7,75.7l45.9-45.9   C511.8,209,511.8,197.2,504.6,190z"
                        class="colorF1786B svgShape"></path>
                      <rect width="15.8" height="107" x="418.5" y="165.2" fill="#eff3f5"
                        transform="rotate(-45.001 426.372 218.733)" class="colorEFF3F5 svgShape"></rect>
                    </svg></button>
                </div>
                <div class="flex flex-col items-center" v-else>
                  <input class="w-[60%] text-center border-b border-blue-500 mb-2" v-model="user.editPhone" />
                  <div class="flex justify-evenly">
                    <button
                      class="mr-[25px]"
                      @click="savePhone(user)">
                      <svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd" stroke-linejoin="round"
                        stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 32 32" width="20" height="20">
                        <path fill="url(#a)"
                          d="M26.792 10.518c0-.503-.108-.998-.313-1.435l-2.17-4.625C23.886 3.556 23.099 3 22.247 3H8.583C7.272 3 6.208 4.295 6.208 5.893v21.214C6.208 28.705 7.272 30 8.583 30h15.834c1.311 0 2.375-1.295 2.375-2.893V10.518z"
                          transform="matrix(1.26316 0 0 1.03704 -4.842 -1.111)"></path>
                        <path fill="url(#b)"
                          d="M22.857 25c0-1.657-1.023-3-2.286-3h-9.142c-1.263 0-2.286 1.343-2.286 3v5h13.714z"
                          transform="matrix(1.3125 0 0 1 -5 0)"></path>
                        <path fill="url(#c)" d="M22 25c0-1.657-1.151-3-2.571-3h-6.858C11.151 22 10 23.343 10 25v5h12z"
                          transform="matrix(1.16667 0 0 -1 -2.667 32)"></path>
                        <path fill-opacity=".1"
                          d="M19 27a1 1 0 0 0-1-1h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 1-1zm-4-14c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm5-11h-2v5a.997.997 0 0 0 1 1 .997.997 0 0 0 1-1V2z"
                          fill="#000000" class="color000 svgShape"></path>
                        <path fill="url(#d)" d="M20 16a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4z"></path>
                        <path fill="url(#e)" d="M18 16a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2z"></path>
                        <path fill="url(#f)"
                          d="M20 26c0-.552-.392-1-.875-1h-5.25c-.483 0-.875.448-.875 1s.392 1 .875 1h5.25c.483 0 .875-.448.875-1Z"
                          transform="matrix(1.14286 0 0 1 -2.857 0)"></path>
                        <path fill="url(#g)"
                          d="M20 2h-2v3.2c0 .212.105.416.293.566.187.15.442.234.707.234.265 0 .52-.084.707-.234A.729.729 0 0 0 20 5.2V2Z"
                          transform="matrix(1 0 0 1.25 1 -.5)"></path>
                        <defs>
                          <linearGradient id="a" x1="0" x2="1" y1="0" y2="0"
                            gradientTransform="matrix(.79167 -26.0357 21.375 .96429 15.708 29.036)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#803cf9" class="stopColor803cf9 svgShape"></stop>
                            <stop offset="1" stop-color="#ac6aff" class="stopColorac6aff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="b" x1="0" x2="1" y1="0" y2="0"
                            gradientTransform="matrix(0 -8 6.09524 0 16 30)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#a967ff" class="stopColora967ff svgShape"></stop>
                            <stop offset="1" stop-color="#ffffff" class="stopColorfff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="c" x1="0" x2="1" y1="0" y2="0"
                            gradientTransform="matrix(0 -8 -6.85714 0 16 30)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ffffff" class="stopColorfff svgShape"></stop>
                            <stop offset="1" stop-color="#be8cff" class="stopColorbe8cff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="d" x1="0" x2="1" y1="0" y2="0" gradientTransform="matrix(0 -8 8 0 16 20)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ac69ff" class="stopColorac69ff svgShape"></stop>
                            <stop offset=".5" stop-color="#d5b4ff" class="stopColord5b4ff svgShape"></stop>
                            <stop offset="1" stop-color="#ffffff" class="stopColorfff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="e" x1="0" x2="1" y1="0" y2="0" gradientTransform="matrix(0 -3 3 0 16 18)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#a25bff" class="stopColora25bff svgShape"></stop>
                            <stop offset="1" stop-color="#c89cff" class="stopColorc89cff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="f" x1="0" x2="1" y1="0" y2="0"
                            gradientTransform="matrix(0 -2 1.75 0 16.5 27)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#813df9" class="stopColor813df9 svgShape"></stop>
                            <stop offset="1" stop-color="#a967ff" class="stopColora967ff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="g" x1="0" x2="1" y1="0" y2="0" gradientTransform="matrix(0 -3.2 4 0 19 5.2)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#a25bff" class="stopColora25bff svgShape"></stop>
                            <stop offset="1" stop-color="#b983ff" class="stopColorb983ff svgShape"></stop>
                          </linearGradient>
                        </defs>
                      </svg>
                    </button>
                    <button 
                      @click="cancelEditPhone(user)"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><g transform="translate(0 -1028.362)" fill="#000000" class="color000 svgShape"><circle cx="657.054" cy="437.094" r="15.268" fill="#ef4c45" fill-rule="evenodd" transform="translate(-504.421 696.821) scale(.78596)" class="coloref4c45 svgShape"></circle><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-transform:none;block-progression:tb" fill="#df2209" d="M14.525 23.717a12 12 0 0 0 .686-.154 12 12 0 0 0 1.137-.38 12 12 0 0 0 1.095-.488 12 12 0 0 0 1.041-.597 12 12 0 0 0 .975-.698 12 12 0 0 0 .902-.793 12 12 0 0 0 .817-.877 12 12 0 0 0 .726-.955 12 12 0 0 0 .627-1.021 12 12 0 0 0 .522-1.08 12 12 0 0 0 .412-1.127 12 12 0 0 0 .26-1.016l-7.13-7.129A6.478 6.478 0 0 0 12 5.496a6.478 6.478 0 0 0-4.596 1.906A6.482 6.482 0 0 0 5.496 12a6.48 6.48 0 0 0 1.908 4.596l7.121 7.12z" color="#000" font-family="sans-serif" font-weight="400" transform="translate(0 1028.362)" class="colordf2209 svgShape"></path><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-transform:none;block-progression:tb" fill="#ffffff" d="M8.498 1.994c1.662 0 3.324.635 4.596 1.906a6.494 6.494 0 0 1 0 9.194 6.491 6.491 0 0 1-9.192 0 6.48 6.48 0 0 1-1.879-5.219A6.482 6.482 0 0 1 3.903 3.9a6.478 6.478 0 0 1 4.595-1.906zm2.467 3.522c-.001 0-.003 0-.004.002a.506.506 0 0 0-.342.152L8.496 7.79 6.375 5.67a.506.506 0 0 0-.357-.152c-.397-.002-.635.584-.35.859l2.121 2.121-2.121 2.121c-.383.368.34 1.09.707.707l2.121-2.12 2.123 2.12c.368.383 1.09-.34.707-.707l-2.12-2.121 2.12-2.121c.29-.278.04-.874-.361-.861Z" color="#000" font-family="sans-serif" font-weight="400" overflow="visible" transform="translate(3.503 1031.865)" class="colorfff svgShape"></path></g></svg></button>
                  </div>

                </div>
              </td>
              <td class="py-4 border border-gray-300">
                <div v-if="!user.isEditingRole">
                  <span class="block">{{ user.Role }}</span>
                  <button 
                    @click="editRole(user)">
                    <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 512 512"
                      viewBox="0 0 512 512" width="20" height="20">
                      <polygon fill="#eff3f5" points="282 2 2 2 2 510 395.3 510 395.3 115.3" class="colorEFF3F5 svgShape">
                      </polygon>
                      <polygon fill="#dbdfe0" points="282 115.3 395.3 115.3 282 2" class="colorDBDFE0 svgShape"></polygon>
                      <rect width="179.9" height="30.1" x="62.2" y="85.2" fill="#5ac8ae" class="color5AC8AE svgShape">
                      </rect>
                      <rect width="272.9" height="30.1" x="62.2" y="169.3" fill="#dbdfe0" class="colorDBDFE0 svgShape">
                      </rect>
                      <rect width="272.9" height="30.1" x="62.2" y="253.4" fill="#dbdfe0" class="colorDBDFE0 svgShape">
                      </rect>
                      <rect width="272.9" height="30.1" x="62.2" y="337.5" fill="#dbdfe0" class="colorDBDFE0 svgShape">
                      </rect>
                      <rect width="272.9" height="30.1" x="62.2" y="417.3" fill="#dbdfe0" class="colorDBDFE0 svgShape">
                      </rect>
                      <rect width="35.7" height="232.3" x="295.6" y="165.1" fill="#fbd984"
                        transform="rotate(45.001 313.447 281.208)" class="colorFBD984 svgShape"></rect>
                      <rect width="35.7" height="232.3" x="295.6" y="165.1" fill="#fbd984"
                        transform="rotate(45.001 313.447 281.208)" class="colorFBD984 svgShape"></rect>
                      <rect width="35.7" height="232.3" x="320.8" y="190.3" fill="#f0b972"
                        transform="rotate(45.001 338.67 306.43)" class="colorF0B972 svgShape"></rect>
                      <rect width="35.7" height="232.3" x="346.1" y="215.5" fill="#e39a61"
                        transform="rotate(45.001 363.892 331.652)" class="colorE39A61 svgShape"></rect>
                      <polygon fill="#ffffff" points="294.4 426.4 218.7 350.7 184.7 428 217.1 460.4"
                        class="colorFFF svgShape"></polygon>
                      <path fill="#445c6c" d="M184.7,428l-16.6,37.6c-3.2,7.2,4.2,14.5,11.3,11.3l37.6-16.6L184.7,428z"
                        class="color445C6C svgShape"></path>
                      <path fill="#f1786b"
                        d="M504.6,190l-49.4-49.4c-7.2-7.2-19-7.2-26.2,0L383,186.5l75.7,75.7l45.9-45.9   C511.8,209,511.8,197.2,504.6,190z"
                        class="colorF1786B svgShape"></path>
                      <rect width="15.8" height="107" x="418.5" y="165.2" fill="#eff3f5"
                        transform="rotate(-45.001 426.372 218.733)" class="colorEFF3F5 svgShape"></rect>
                    </svg></button>
                </div>
                <div class="flex flex-col items-center" v-else>

     <select
      id="role"
      v-model="user.editRole"
      class="w-[60%] text-left border-b border-blue-500 mb-2"
    >
      <!-- Populate options from the roles array -->
      <option value="" disabled>Select a role</option>
      <option v-for="role in userRoles.availableRoles" :key="role" :value="role">{{ role }}</option>
    </select>
                  <div class="flex justify-evenly">
                    <button
                      class="mr-[25px]"
                      @click="saveRole(user)"><svg xmlns="http://www.w3.org/2000/svg" fill-rule="evenodd"
                        stroke-linejoin="round" stroke-miterlimit="2" clip-rule="evenodd" viewBox="0 0 32 32" width="20"
                        height="20">
                        <path fill="url(#a)"
                          d="M26.792 10.518c0-.503-.108-.998-.313-1.435l-2.17-4.625C23.886 3.556 23.099 3 22.247 3H8.583C7.272 3 6.208 4.295 6.208 5.893v21.214C6.208 28.705 7.272 30 8.583 30h15.834c1.311 0 2.375-1.295 2.375-2.893V10.518z"
                          transform="matrix(1.26316 0 0 1.03704 -4.842 -1.111)"></path>
                        <path fill="url(#b)"
                          d="M22.857 25c0-1.657-1.023-3-2.286-3h-9.142c-1.263 0-2.286 1.343-2.286 3v5h13.714z"
                          transform="matrix(1.3125 0 0 1 -5 0)"></path>
                        <path fill="url(#c)" d="M22 25c0-1.657-1.151-3-2.571-3h-6.858C11.151 22 10 23.343 10 25v5h12z"
                          transform="matrix(1.16667 0 0 -1 -2.667 32)"></path>
                        <path fill-opacity=".1"
                          d="M19 27a1 1 0 0 0-1-1h-6a1 1 0 0 0 0 2h6a1 1 0 0 0 1-1zm-4-14c2.208 0 4 1.792 4 4s-1.792 4-4 4-4-1.792-4-4 1.792-4 4-4zm5-11h-2v5a.997.997 0 0 0 1 1 .997.997 0 0 0 1-1V2z"
                          fill="#000000" class="color000 svgShape"></path>
                        <path fill="url(#d)" d="M20 16a4 4 0 0 1-4 4 4 4 0 0 1-4-4 4 4 0 0 1 4-4 4 4 0 0 1 4 4z"></path>
                        <path fill="url(#e)" d="M18 16a2 2 0 0 1-2 2 2 2 0 0 1-2-2 2 2 0 0 1 2-2 2 2 0 0 1 2 2z"></path>
                        <path fill="url(#f)"
                          d="M20 26c0-.552-.392-1-.875-1h-5.25c-.483 0-.875.448-.875 1s.392 1 .875 1h5.25c.483 0 .875-.448.875-1Z"
                          transform="matrix(1.14286 0 0 1 -2.857 0)"></path>
                        <path fill="url(#g)"
                          d="M20 2h-2v3.2c0 .212.105.416.293.566.187.15.442.234.707.234.265 0 .52-.084.707-.234A.729.729 0 0 0 20 5.2V2Z"
                          transform="matrix(1 0 0 1.25 1 -.5)"></path>
                        <defs>
                          <linearGradient id="a" x1="0" x2="1" y1="0" y2="0"
                            gradientTransform="matrix(.79167 -26.0357 21.375 .96429 15.708 29.036)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#803cf9" class="stopColor803cf9 svgShape"></stop>
                            <stop offset="1" stop-color="#ac6aff" class="stopColorac6aff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="b" x1="0" x2="1" y1="0" y2="0"
                            gradientTransform="matrix(0 -8 6.09524 0 16 30)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#a967ff" class="stopColora967ff svgShape"></stop>
                            <stop offset="1" stop-color="#ffffff" class="stopColorfff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="c" x1="0" x2="1" y1="0" y2="0"
                            gradientTransform="matrix(0 -8 -6.85714 0 16 30)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ffffff" class="stopColorfff svgShape"></stop>
                            <stop offset="1" stop-color="#be8cff" class="stopColorbe8cff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="d" x1="0" x2="1" y1="0" y2="0" gradientTransform="matrix(0 -8 8 0 16 20)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#ac69ff" class="stopColorac69ff svgShape"></stop>
                            <stop offset=".5" stop-color="#d5b4ff" class="stopColord5b4ff svgShape"></stop>
                            <stop offset="1" stop-color="#ffffff" class="stopColorfff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="e" x1="0" x2="1" y1="0" y2="0" gradientTransform="matrix(0 -3 3 0 16 18)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#a25bff" class="stopColora25bff svgShape"></stop>
                            <stop offset="1" stop-color="#c89cff" class="stopColorc89cff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="f" x1="0" x2="1" y1="0" y2="0"
                            gradientTransform="matrix(0 -2 1.75 0 16.5 27)" gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#813df9" class="stopColor813df9 svgShape"></stop>
                            <stop offset="1" stop-color="#a967ff" class="stopColora967ff svgShape"></stop>
                          </linearGradient>
                          <linearGradient id="g" x1="0" x2="1" y1="0" y2="0" gradientTransform="matrix(0 -3.2 4 0 19 5.2)"
                            gradientUnits="userSpaceOnUse">
                            <stop offset="0" stop-color="#a25bff" class="stopColora25bff svgShape"></stop>
                            <stop offset="1" stop-color="#b983ff" class="stopColorb983ff svgShape"></stop>
                          </linearGradient>
                        </defs>
                      </svg></button>
                    <button 
                      @click="cancelEditRole(user)"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20"><g transform="translate(0 -1028.362)" fill="#000000" class="color000 svgShape"><circle cx="657.054" cy="437.094" r="15.268" fill="#ef4c45" fill-rule="evenodd" transform="translate(-504.421 696.821) scale(.78596)" class="coloref4c45 svgShape"></circle><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-transform:none;block-progression:tb" fill="#df2209" d="M14.525 23.717a12 12 0 0 0 .686-.154 12 12 0 0 0 1.137-.38 12 12 0 0 0 1.095-.488 12 12 0 0 0 1.041-.597 12 12 0 0 0 .975-.698 12 12 0 0 0 .902-.793 12 12 0 0 0 .817-.877 12 12 0 0 0 .726-.955 12 12 0 0 0 .627-1.021 12 12 0 0 0 .522-1.08 12 12 0 0 0 .412-1.127 12 12 0 0 0 .26-1.016l-7.13-7.129A6.478 6.478 0 0 0 12 5.496a6.478 6.478 0 0 0-4.596 1.906A6.482 6.482 0 0 0 5.496 12a6.48 6.48 0 0 0 1.908 4.596l7.121 7.12z" color="#000" font-family="sans-serif" font-weight="400" transform="translate(0 1028.362)" class="colordf2209 svgShape"></path><path style="line-height:normal;text-indent:0;text-align:start;text-decoration-line:none;text-transform:none;block-progression:tb" fill="#ffffff" d="M8.498 1.994c1.662 0 3.324.635 4.596 1.906a6.494 6.494 0 0 1 0 9.194 6.491 6.491 0 0 1-9.192 0 6.48 6.48 0 0 1-1.879-5.219A6.482 6.482 0 0 1 3.903 3.9a6.478 6.478 0 0 1 4.595-1.906zm2.467 3.522c-.001 0-.003 0-.004.002a.506.506 0 0 0-.342.152L8.496 7.79 6.375 5.67a.506.506 0 0 0-.357-.152c-.397-.002-.635.584-.35.859l2.121 2.121-2.121 2.121c-.383.368.34 1.09.707.707l2.121-2.12 2.123 2.12c.368.383 1.09-.34.707-.707l-2.12-2.121 2.12-2.121c.29-.278.04-.874-.361-.861Z" color="#000" font-family="sans-serif" font-weight="400" overflow="visible" transform="translate(3.503 1031.865)" class="colorfff svgShape"></path></g></svg></button>
                  </div>

                </div>
              </td>
              <td class="py-4 border border-gray-300">
                <span class="block">{{ user.lastLoginDate }}</span>
                <span>{{ user.lastLoginTime }}</span>

              </td>
              <td class="py-4 border border-gray-300">
                <span class="block">{{ user.lastSignOutDate }}</span>
                <span>{{ user.lastSignOutTime }}</span>

              </td>
              <td class="py-4 border border-gray-300">
                <el-tooltip :content="'Switch user status: ' + user.status" placement="top">
                  <el-switch v-model="user.status" :active-value="'enabled'" :inactive-value="'disabled'"
                    active-color="#13ce66" inactive-color="#ff4949"
                    @change="updateUserStatus(user.id, user.status)"></el-switch>
                </el-tooltip>
              </td>
            </tr>
          </tbody>
        </table>
        <!-- Pagination controls -->

        <div class="mt-4 button-pagination no-print">
          <button @click="previousPage" :disabled="currentPage === 1"
            class="px-3 py-[10px] mr-[25px] bg-blue-500 text-white hover:bg-blue-700 rounded-md cursor-pointer">
            Previous
          </button>
          <!-- Display page Numbers -->
          <div class="flex justify-center space-x-2 no-print">
            <span v-for="pageNumber in totalPages" :key="pageNumber">
              <button @click="goToPage(pageNumber)" :class="{
                'bg-blue-500 text-white hover:bg-blue-700 rounded-md cursor-pointer':
                  currentPage === pageNumber,
                'bg-gray-200 text-gray-500 hover:bg-gray-300 rounded-md cursor-pointer':
                  currentPage !== pageNumber,
              }" class="px-3 py-2 transition duration-300 ease-in-out">
                {{ pageNumber }}
              </button>
            </span>
          </div>

          <button @click="nextPage" :disabled="currentPage * itemsPerPage >= users.length"
            class="px-3 py-[10px] ml-[25px] bg-blue-500 no-print text-white hover:bg-blue-700 rounded-md cursor-pointer">
            Next
          </button>
        </div>

        <div class="mt-2 text-center no-print">
          <div class="bg-gray-200 p-4 rounded-sm shadow-sm flex items-center text-[20px] justify-center">
            <p class="font-semibold text-black">
              Total users:<span class="ml-4 text-3xl font-semibold text-orange-500">
                {{ users.length }}</span>
            </p>
          </div>
        </div>
      </div>
    </div>

    <Signup v-if="showUserModal" @close="closeUserModal" />
  </div>
</template>

  
<script setup>
import { ref, onMounted, watch, computed } from "vue";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import Signup from "../views/Signup.vue";
import {useRoleStore} from "../stores/roles.js";
const userRoles = useRoleStore();
import jsPDF from "jspdf";
import "jspdf-autotable";
import * as XLSX from "xlsx";

// Control the visibility of the User registration modal
const showUserModal = ref(false);
// Define the Firestore database reference
const db = firebase.firestore();
// Define pagination state
const currentPage = ref(1); // Current page
const itemsPerPage = 5; // description of items to display per page
const searchQuery = ref("");
// Define a ref to store the list of users
const users = ref([]);
// Method to export the table content to PDF
const exportToPDF = () => {
  // Create a new jsPDF instance
  const pdf = new jsPDF();

  // Define columns for the table
  const columns = ["User Name", "User description"];

  // Define the rows of the table by mapping over your User data
  const rows = users.value.map((User) => [User.name, User.description]);

  // Set the title for the PDF
  pdf.setFontSize(16);
  pdf.text("User List", 10, 10);

  // AutoTable is a jsPDF plugin for creating tables
  pdf.autoTable({
    head: [columns],
    body: rows,
  });

  // Save the PDF with a filename
  pdf.save("User-list.pdf");
};

const exportToExcel = () => {
  // Check if 'users' is an array
  if (!Array.isArray(users.value)) {
    window.alert("users is not an array.");
    return;
  }

  // Create a new workbook
  const workbook = XLSX.utils.book_new();

  // Create a worksheet and add data to it
  const worksheet = XLSX.utils.aoa_to_sheet([
    ["User Name", "User description"],
    // Map your User data to rows here
    ...users.value.map((User) => [User.name, User.description]),
  ]);

  // Add the worksheet to the workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, "User List");
  const workbookOutput = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });
  const blob = new Blob([workbookOutput], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  // Create a download link and trigger the download
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "User-list.xlsx";
  a.click();

  // Clean up the URL.createObjectURL
  window.URL.revokeObjectURL(url);
};
const printTable = () => {
  // Trigger the browser's print dialog
  window.print();
};

const searchUsers = () => {
  if (searchQuery.value.trim() === "") {
    // Reset the User list if the search query is empty
    fetchUsersData();
  } else {
    // Filter users based on the search query
    const query = searchQuery.value.toLowerCase().trim();
    users.value = users.value.filter((user) => {
      const UserName = user.name.toLowerCase();
      return UserName.includes(query);
    });
  }
};
// Method to update the user's status (enabled/disabled)
const updateUserStatus = async (userId, currentStatus) => {
  try {
    const userRef = db.collection("users").doc(userId);

    // Toggle the user's status()
    if (currentStatus === "enabled") {
      const newStatus = "enabled";
      await userRef.update({ status: newStatus });
    } else if (currentStatus === "disabled") {
      const newStatus = "disabled";
      await userRef.update({ status: newStatus });
    }
  } catch (error) {
    console.error("Error updating user status", error);
  }
};
const editUsername = (user) => {
  // Enter editing mode for the username
  user.isEditingUsername = true;
  // Create backup of original username
  user.editUsername = user.Username;
};

const saveUsername = async (user) => {
  try {
    // Update the user's username in Firestore
    const userRef = db.collection("users").doc(user.id);
    await userRef.update({
      Username: user.editUsername
    });

    // Exit editing mode
    user.isEditingUsername = false;
    fetchUsersData();
  } catch (error) {
    console.error("Error updating username", error);
  }
};

const cancelEditUsername = (user) => {
  // Exit editing mode without saving changes
  user.isEditingUsername = false;
};

const editPhone = (user) => {
  // Enter editing mode for the phone number
  user.isEditingPhone = true;
  // Create backup of original phone number
  user.editPhone = user.Phone_Number;
};

const savePhone = async (user) => {
  try {
    // Update the user's phone number in Firestore
    const userRef = db.collection("users").doc(user.id);
    await userRef.update({
      Phone_Number: user.editPhone
    });

    // Exit editing mode
    user.isEditingPhone = false;
    fetchUsersData();
  } catch (error) {
    console.error("Error updating phone number", error);
  }
};

const cancelEditPhone = (user) => {
  // Exit editing mode without saving changes
  user.isEditingPhone = false;
};

const editRole = (user) => {
  // Enter editing mode for the role
  user.isEditingRole = true;
  // Create backup of original role
  user.editRole = user.Role;
};

const saveRole = async (user) => {
  try {
    // Update the user's role in Firestore
    const userRef = db.collection("users").doc(user.id);
    await userRef.update({
      Role: user.editRole
    });

    // Exit editing mode
    user.isEditingRole = false;
    fetchUsersData();
  } catch (error) {
    console.error("Error updating role", error);
  }
};

const cancelEditRole = (user) => {
  // Exit editing mode without saving changes
  user.isEditingRole = false;
};;

//Create a computed property that returns the users to display on the current page:
const paginatedUsers = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  return users.value.slice(startIndex, endIndex);
});
// Function to go to the previous page
const previousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};
const totalPages = computed(() => {
  return Math.ceil(users.value.length / itemsPerPage);
});
const goToPage = (pageNumber) => {
  currentPage.value = pageNumber;
};
const userId = ref("");
// Function to go to the next page
const nextPage = () => {
  const totalPages = Math.ceil(users.length / itemsPerPage);
  if (currentPage.value < totalPages) {
    currentPage.value++;
  }
};
const fetchUsersData = async () => {
  try {
    const usersSnapshot = await db.collection("users").get();
    users.value = usersSnapshot.docs.map((doc) => {
      const userData = doc.data();
      return {
        ...userData,
      };
    });

    // Filter out users with the role "tech"
    users.value = users.value.filter((user) => user.Role !== "Tech");
  } catch (error) {
    // Handle any errors that occur during the fetch
    window.alert("Error fetching users");
    throw error; // Optionally rethrow the error for the component to handle
  }
};


// Function to open the User registration modal
const openUserRegistrationModal = () => {
  // Set showUserModal to true to show the modal
  showUserModal.value = true;
};
const closeUserModal = () => {
  showUserModal.value = false;
  // Fetch the updated list of categories after a new category is registered
  fetchUsersData();
};

// Fetch users when the component is mounted
onMounted(() => {
  firebase.auth().onAuthStateChanged(async (firebaseUser) => {
    userId.value = firebaseUser.uid;
  });
  fetchUsersData();
  userRoles.fetchAvailableRoles();
});

watch([searchQuery], () => {
  if (searchQuery.value === "") {
    fetchUsersData();
  }
});
</script>
  