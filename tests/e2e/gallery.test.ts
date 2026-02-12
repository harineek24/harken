import { test, expect } from "@playwright/test";

test.describe("Gallery", () => {
  test("home page loads and renders the gallery", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle(/Hark Back/);

    const galleryContainer = page.locator(".gallery-container");
    await expect(galleryContainer).toBeVisible();

    const canvas = galleryContainer.locator("canvas");
    await expect(canvas).toBeVisible();
  });
});
