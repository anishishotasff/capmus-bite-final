# Quick Reference: Mobile Responsive Features

## CSS Classes for Mobile

### Layout Classes
- `.navbar` - Responsive navigation (collapses on mobile)
- `.nav-toggle` - Hamburger menu button (shows on ≤768px)
- `.hero-content` - Responsive hero grid
- `.category-grid` - Responsive category cards
- `.food-grid` - Responsive food items grid
- `.dashboard-layout` - Single column on mobile
- `.cart-layout` - Single column on mobile
- `.admin-layout` - Single column on mobile

### Utility Classes
- `.w-full` - Full width (100%)
- `.hidden` - Display none
- `.btn` - Touch-optimized buttons
- `.btn-primary` - Primary action button
- `.btn-outline` - Secondary button
- `.btn-ghost` - Tertiary button

## JavaScript Functions

### Mobile Navigation
```javascript
initMobileNavigation()
```
- Handles hamburger menu toggle
- Closes menu on outside click
- Closes menu on link click

## Media Query Breakpoints

| Breakpoint | Width | Target Devices |
|------------|-------|----------------|
| Large Desktop | >960px | Desktops |
| Tablet | ≤960px | Tablets, small laptops |
| Mobile Nav | ≤768px | Mobile devices (nav collapses) |
| Mobile | ≤600px | Smartphones |
| Small Mobile | ≤480px | Small phones |

## Common Responsive Patterns

### 1. Navigation Menu
```html
<button class="nav-toggle" aria-label="Toggle navigation">
  <span></span>
  <span></span>
  <span></span>
</button>
<ul class="nav-links">
  <!-- Links here -->
</ul>
```

### 2. Responsive Grid
```html
<div class="food-grid">
  <!-- Items automatically adjust columns -->
</div>
```

### 3. Mobile-First Buttons
```html
<button class="btn btn-primary">
  <!-- Minimum 44x44px touch target -->
</button>
```

## Testing Checklist

- [ ] Test hamburger menu on mobile
- [ ] Verify touch targets are at least 44x44px
- [ ] Check horizontal scroll (should not exist except tables)
- [ ] Test form inputs on mobile keyboards
- [ ] Verify images scale properly
- [ ] Test in portrait and landscape
- [ ] Check sticky elements behavior
- [ ] Verify cart operations on mobile
- [ ] Test table horizontal scrolling

## Browser DevTools Tips

### Chrome DevTools
1. Press F12
2. Click device toolbar icon (Ctrl+Shift+M)
3. Select device or enter custom dimensions
4. Test responsive breakpoints

### Recommended Test Sizes
- 320 x 568 (iPhone SE)
- 375 x 667 (iPhone 8)
- 414 x 896 (iPhone 11 Pro Max)
- 768 x 1024 (iPad)

## Performance Tips

1. Images use `loading="lazy"` attribute
2. Smooth scrolling with `scroll-behavior: smooth`
3. Hardware acceleration with transforms
4. Overflow-x hidden to prevent horizontal scroll
5. Touch-action for better touch performance

## Accessibility Features

- ✅ Focus visible outlines
- ✅ ARIA labels on navigation toggle
- ✅ Semantic HTML structure
- ✅ Keyboard navigation support
- ✅ Minimum touch target sizes

## Common Issues & Solutions

### Issue: Menu doesn't toggle
**Solution:** Ensure JavaScript is loaded and `initMobileNavigation()` is called

### Issue: Horizontal scroll on mobile
**Solution:** Check for fixed widths, use `max-width: 100%` on images

### Issue: Text too small on mobile
**Solution:** Use clamp() or adjust font-size in mobile media queries

### Issue: Buttons too small to tap
**Solution:** Ensure minimum 44x44px size with padding

### Issue: Tables overflow
**Solution:** Wrap in `.table-wrapper` with horizontal scroll

---

**Quick Start:** All pages are now mobile responsive out of the box. Just ensure JavaScript is loaded for mobile navigation to work properly.
