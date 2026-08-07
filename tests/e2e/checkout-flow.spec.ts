import { test, expect } from '@playwright/test';

test.describe('E2E Checkout Flow', () => {
  test('Guest user can navigate to product and initialize checkout', async ({ page }) => {
    // 1. Visit the homepage
    await page.goto('/');
    await expect(page).toHaveTitle(/ATELIER/);

    // 2. Find and click the first product card
    // Assuming we have at least one product seeded. We wait for the product grid to load.
    const productCard = page.locator('a[href^="/products/"]').first();
    await expect(productCard).toBeVisible();
    
    // Store product URL to navigate directly if click causes issues in test
    const productUrl = await productCard.getAttribute('href');
    expect(productUrl).not.toBeNull();
    
    // Navigate to product page
    await page.goto(productUrl as string);
    
    // 3. Click "Beli Sekarang"
    const buyButton = page.getByRole('link', { name: /Beli Sekarang/i });
    await expect(buyButton).toBeVisible();
    await buyButton.click();

    // 4. Fill in the Guest Checkout Form
    await expect(page.getByText('Data Informasi Pembeli')).toBeVisible();
    
    await page.getByPlaceholder('Contoh: Roedy Rustam').fill('Budi Test');
    await page.getByPlaceholder('email@domain.com').fill('budi@example.com');
    await page.getByPlaceholder('081234567890').fill('081234567890');

    // 5. Submit Checkout
    const payButton = page.getByRole('button', { name: /Bayar Sekarang/i });
    await expect(payButton).toBeEnabled();
    
    // We do not actually click the pay button in basic E2E because 
    // it will trigger a real DOKU API call (even in Sandbox) causing test pollution.
    // However, we verify the button is accessible and the form is valid.
    expect(await payButton.textContent()).toMatch(/Bayar Sekarang/);
  });
});
