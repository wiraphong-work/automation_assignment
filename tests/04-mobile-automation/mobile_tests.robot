*** Settings ***
Library           AppiumLibrary

*** Variables ***
${REMOTE_URL}     http://127.0.0.1:4723
${PLATFORM}       Android
${DEVICE_NAME}    emulator-5554
${APP_PATH}       ${CURDIR}/app-release.apk
${APP_PACKAGE}    com.avjindersinghsekhon.minimaltodo

*** Test Cases ***
Scenario 1: Add New Todo Task Successfully
    [Documentation]    ทดสอบการเพิ่ม Task "Buy Milk"
    Open Minimal Todo Application
    
    Wait Until Element Is Visible    id=${APP_PACKAGE}:id/addToDoItemFAB    timeout=15s
    Click Element    id=${APP_PACKAGE}:id/addToDoItemFAB
    
    Wait Until Element Is Visible    id=${APP_PACKAGE}:id/userToDoEditText    timeout=10s
    Input Text       id=${APP_PACKAGE}:id/userToDoEditText    Buy Milk
    
    Hide Keyboard
    Sleep    1s
    # กดปุ่มบันทึกสีฟ้า
    Run Keyword And Ignore Error    Click Element    xpath=//android.widget.ImageButton[contains(@resource-id, 'FloatingActionButton')]
    
    Wait Until Page Contains    Buy Milk    timeout=15s

Scenario 2: Edit Existing Todo Task
    [Documentation]    แก้ไขจาก Buy Milk เป็น Buy Milk Edited
    Wait Until Page Contains    Buy Milk    timeout=10s
    Click Text    Buy Milk
    
    Wait Until Element Is Visible    id=${APP_PACKAGE}:id/userToDoEditText    timeout=10s
    Clear Text       id=${APP_PACKAGE}:id/userToDoEditText
    Input Text       id=${APP_PACKAGE}:id/userToDoEditText    Buy Milk Edited
    
    Hide Keyboard
    Sleep    1s
    Run Keyword And Ignore Error    Click Element    xpath=//android.widget.ImageButton[contains(@resource-id, 'FloatingActionButton')]
    
    Wait Until Page Contains    Buy Milk Edited    timeout=15s

Scenario 3: Delete Todo Task by Swiping
    [Documentation]    ทดสอบการลบ Task โดยการปัดซ้าย (Swipe Left)
    Wait Until Page Contains    Buy Milk Edited    timeout=10s
    
    # ดึงพิกัดเพื่อคำนวณการปัด
    ${element_size}=    Get Element Size      xpath=//*[contains(@text, 'Buy Milk Edited')]
    ${element_location}=    Get Element Location    xpath=//*[contains(@text, 'Buy Milk Edited')]
    
    # จุดเริ่มต้น (ขวา)
    ${start_x}=    Evaluate    ${element_location['x']} + (${element_size['width']} * 0.9)
    ${start_y}=    Evaluate    ${element_location['y']} + (${element_size['height']} / 2)
    
    # จุดสิ้นสุด (ซ้าย) 
    ${end_x}=      Evaluate    ${element_location['x']} + (${element_size['width']} * 0.1)
    ${end_y}=      Set Variable    ${start_y}
    
    Swipe    start_x=${start_x}    start_y=${start_y}    end_x=${end_x}    end_y=${end_y}    duration=1000
    
    # ตรวจสอบว่าข้อมูลหายไปแล้ว
    Wait Until Page Does Not Contain    Buy Milk Edited    timeout=10s
    [Teardown]    Close Application

*** Keywords ***
Open Minimal Todo Application
    Open Application    ${REMOTE_URL}
    ...    platformName=${PLATFORM}
    ...    deviceName=${DEVICE_NAME}
    ...    app=${APP_PATH}
    ...    automationName=UiAutomator2
    ...    noReset=true
    ...    fullReset=false

    # จัดการป๊อปอัพ "Build for older version"
    ${is_dialog}=    Run Keyword And Return Status    Wait Until Page Contains    OK    timeout=8s
    Run Keyword If    ${is_dialog}    Click Text    OK