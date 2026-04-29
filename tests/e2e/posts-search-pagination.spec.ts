import { expect, test } from '@playwright/test';

test('search query persists between pagination pages', async ({ page }) => {
	await page.goto('/posts');

	await page.getByRole('searchbox', { name: 'Поиск по постам' }).fill('qui');

	await page.waitForURL(/\/posts\?q=qui&page=1/);

	await page.getByRole('link', { name: '2' }).click();
	await page.waitForURL(/\/posts\?page=2&q=qui/);

	await expect(page.getByRole('searchbox', { name: 'Поиск по постам' })).toHaveValue('qui');
});
