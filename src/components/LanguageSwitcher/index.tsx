function switchLanguage(lang: 'en' | 'pt') {
  console.log('Attempting to switch language to:', lang)

  // Check if Google Translate is loaded
  if (typeof window.google === 'undefined' || !window.google.translate) {
    console.error('Google Translate API not loaded')
    alert('Google Translate is not loaded yet. Please wait and try again.')
    return
  }

  // Look for the visible Google Translate select/button element
  const translateElement = document.getElementById('google_translate_element')
  if (!translateElement) {
    console.error('Google translate element not found')
    alert('Google Translate element not found.')
    return
  }

  // Debug: Log what's actually inside the translate element
  console.log('Google Translate element content:', translateElement)
  console.log('Google Translate element innerHTML:', translateElement.innerHTML)
  console.log('All elements with goog classes:', document.querySelectorAll('[class*="goog"]'))

  // First try to find the actual translate select element
  const selectElement = translateElement.querySelector('select.goog-te-combo')
  if (selectElement) {
    console.log('Found Google Translate select element')
    const targetLang = lang === 'pt' ? 'pt' : 'en'

    // Set the value and trigger change event
    ;(selectElement as HTMLSelectElement).value = targetLang
    selectElement.dispatchEvent(new Event('change', { bubbles: true }))
    console.log('Language changed via select element to:', targetLang)
    return
  }

  // Try broader selectors
  const allSelects = document.querySelectorAll('select')
  console.log('All select elements on page:', allSelects)

  const googElements = document.querySelectorAll('[class*="goog-te"]')
  console.log('All Google Translate elements:', googElements)

  // Fallback: Look for the clickable translate button/link
  const translateButton = document.querySelector('.goog-te-gadget-simple .goog-te-menu-value span:first-child')
  if (translateButton) {
    console.log('Found Google Translate button, clicking to open menu')
    ;(translateButton as HTMLElement).click()

    // Wait a bit for the menu to appear, then look for language links
    setTimeout(() => {
      const langLinks = document.querySelectorAll('a.goog-te-menu2-item')
      const targetLangText = lang === 'pt' ? 'Portuguese' : 'English'

      console.log('Found language links:', langLinks.length)
      console.log('Looking for language:', targetLangText)

      langLinks.forEach((link) => {
        console.log('Link text:', link.textContent)
        if (link.textContent && link.textContent.includes(targetLangText)) {
          console.log('Clicking link for:', targetLangText)
          ;(link as HTMLElement).click()
        }
      })
    }, 100)
    return
  }

  console.error('Could not find Google Translate interface elements')
  alert('Google Translate interface not found. Please check console for details.')
}

import React from 'react'

export default function LanguageSwitcher() {
  return (
    <div className="flex items-center gap-2">
      <button onClick={() => switchLanguage('en')}>EN</button>
      <button onClick={() => switchLanguage('pt')}>PT</button>
    </div>
  )
}
