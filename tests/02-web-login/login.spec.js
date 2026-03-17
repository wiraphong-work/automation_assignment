import { test, expect } from '@playwright/test';

test.describe('ข้อ 2: Web Login Automation', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.LOGIN_URL);

        //1. Login page is shown.
        await expect(page).toHaveTitle(/The Internet/);
    });

    test('1. Login success', async ({ page }) => {
        // ใช้ beforeEach เพื่อเปิดหน้าเว็บและตรวจสอบว่าอยู่ที่หน้า Login แล้ว

        await test.step('Step 1: Open browser and go to login page', async () => {
            // เช็ค Expected Result 1: Login page is shown 
            await expect(page.locator('h2')).toHaveText('Login Page');
        });

        await test.step('Step 2: Input correct username and password', async () => {
            await page.fill('#username', process.env.WEB_USERNAME);
            await page.fill('#password', process.env.WEB_PASSWORD);
            await page.click('button[type="submit"]');

            // เช็ค Expected Result 2: Login success message is shown 
            await expect(page.locator('#flash')).toContainText('You logged into a secure area!');
        });

        await test.step('Step 3: Click the Logout button and verify', async () => {
            await page.click('.button.secondary.radius');

            // เช็ค Expected Result 3: Logout message and back to login page 
            await expect(page.locator('#flash')).toContainText('You logged out of the secure area!');
            await expect(page.locator('h2')).toHaveText('Login Page');
        });
    });

    test('2. Login failed - Password incorrect', async ({ page }) => {
        await test.step('Step 1: Open browser and go to login page', async () => {
            // เช็ค Expected Result 1: Login page is shown 
            await expect(page.locator('h2')).toHaveText('Login Page');
        });

        await test.step('Step 2: Input correct username but wrong password', async () => {
            await page.fill('#username', process.env.WEB_USERNAME);
            await page.fill('#password', 'Password!'); // ใส่รหัสผ่านผิดตามโจทย์ 'Password!'
            await page.click('button[type="submit"]');
        });

        await test.step('Verify: Error message for invalid password is shown', async () => {
            // เช็ค Expected Result 2: Login failed message 'Your password is invalid!' is shown 
            await expect(page.locator('#flash')).toContainText('Your password is invalid!');
        });
    });

    test('3. Login failed - Username not found', async ({ page }) => {
        await test.step('Step 1: Open browser and go to login page', async () => {
            // เช็ค Expected Result 1: Login page is shown 
            await expect(page.locator('h2')).toHaveText('Login Page');
        });

        await test.step('Step 2: Input non-existing username', async () => {
            await page.fill('#username', 'tomholland'); // ใส่ Username ที่ไม่มีในระบบตามโจทย์ 'tomholland'
            await page.fill('#password', 'Password!');
            await page.click('button[type="submit"]');
        });

        await test.step('Verify: Error message for invalid username is shown', async () => {
            // เช็ค Expected Result 2: Login failed message 'Your username is invalid!' is shown 
            await expect(page.locator('#flash')).toContainText('Your username is invalid!');
        });
    });
});