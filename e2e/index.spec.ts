import { test, expect } from '@playwright/test'

test.describe('Home page form', () => {
  test.describe('Render', () => {
    test('renders the correct input types', async ({ page }) => {
      await page.goto('/')

      const firstNameInput = page.locator('input[name="firstName"]')
      await expect(firstNameInput).toHaveAttribute('type', 'text')
      await expect(firstNameInput).toHaveValue('')
      await expect(firstNameInput).toHaveAttribute(
        'aria-labelledby',
        'label-for-firstName',
      )
      await expect(firstNameInput).toHaveAttribute('aria-required', 'true')
      await expect(firstNameInput).toHaveAttribute('aria-invalid', 'false')

      const firstNameLabel = page.locator('label[for="firstName"]')
      await expect(firstNameLabel).toHaveText('First Name')
      await expect(firstNameLabel).toHaveId('label-for-firstName')

      const emailInput = page.locator('input[name="email"]')
      await expect(emailInput).toHaveAttribute('type', 'text')
      await expect(emailInput).toHaveValue('')
      await expect(emailInput).toHaveAttribute(
        'aria-labelledby',
        'label-for-email',
      )
      await expect(emailInput).toHaveAttribute('aria-required', 'true')
      await expect(emailInput).toHaveAttribute('aria-invalid', 'false')

      const emailLabel = page.locator('label[for="email"]')
      await expect(emailLabel).toHaveText('Email')
      await expect(emailLabel).toHaveId('label-for-email')

      const selectInput = page.locator('select[name="howYouFoundOutAboutUs"]')
      await expect(selectInput).toHaveValue('fromAFriend')
      await expect(selectInput).toHaveAttribute(
        'aria-labelledby',
        'label-for-howYouFoundOutAboutUs',
      )
      await expect(selectInput).toHaveAttribute('aria-required', 'true')
      await expect(selectInput).toHaveAttribute('aria-invalid', 'false')

      const selectLabel = page.locator('label[for="howYouFoundOutAboutUs"]')
      await expect(selectLabel).toHaveText('How You Found Out About Us')
      await expect(selectLabel).toHaveId('label-for-howYouFoundOutAboutUs')

      const options = page.locator(
        'select[name="howYouFoundOutAboutUs"] > option',
      )
      await expect(options.nth(0)).toHaveText('From A Friend')
      await expect(options.nth(1)).toHaveText('Google')
    })
  })

  test.describe('Client-side validation', () => {
    test('shows the correct errors', async ({ page }) => {
      await page.goto('/')

      // Validate form
      await page.locator('form button:has-text("OK")').click()

      const firstNameInput = page.locator('input[name="firstName"]')
      const emailInput = page.locator('input[name="email"]')

      // Show field errors and focus on the first field
      await expect(page.locator('#errors-for-firstName')).toHaveText(
        'String must contain at least 1 character(s)',
      )
      await expect(page.locator('#errors-for-firstName')).toHaveAttribute(
        'role',
        'alert',
      )
      await expect(firstNameInput).toHaveAttribute('aria-invalid', 'true')
      await expect(firstNameInput).toHaveAttribute(
        'aria-describedBy',
        'errors-for-firstName',
      )
      await expect(page.locator('#errors-for-email')).toHaveText(
        'String must contain at least 1 character(s)',
      )
      await expect(page.locator('#errors-for-email')).toHaveAttribute(
        'role',
        'alert',
      )
      await expect(emailInput).toHaveAttribute('aria-invalid', 'true')
      await expect(emailInput).toHaveAttribute(
        'aria-describedBy',
        'errors-for-email',
      )
      await expect(firstNameInput).toBeFocused()

      // Make first field be valid, focus goes to the second field
      await firstNameInput.type('John')
      await page.locator('form button:has-text("OK")').click()
      await expect(firstNameInput).toHaveAttribute('aria-invalid', 'false')
      await expect(emailInput).toBeFocused()

      // Try another invalid message
      await emailInput.type('john')
      await expect(page.locator('#errors-for-email')).toHaveText(
        'Invalid email',
      )
      await expect(emailInput).toHaveAttribute('aria-invalid', 'true')

      // Make form be valid
      await emailInput.type('john@doe.com')
      await expect(emailInput).toHaveAttribute('aria-invalid', 'false')
    })
  })

  test.describe('Submit', () => {
    test('submits the form and redirects', async ({ page }) => {
      await page.goto('/')

      await page.locator('input[name="firstName"]').type('John')
      await page.locator('input[name="email"]').type('john@doe.com')

      await page.locator('form button:has-text("OK")').click()

      await expect(page).toHaveURL('/success')
    })
  })
})
