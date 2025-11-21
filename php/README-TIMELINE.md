# Timeline PHP Implementation

## Overview

This is a PHP implementation of an interactive timeline component with click-to-expand image functionality for the Pian Alimentos website.

## Features

### 1. Interactive Timeline
- Horizontal scrollable timeline with all company milestones from 1984 to 2025
- Year navigation buttons with progress indicator
- Smooth scroll animations
- Active state highlighting for current year

### 2. Click-to-Expand Images
- All timeline photos are clickable
- Opens full-screen modal with enlarged image
- Smooth fade-in animation
- Backdrop blur effect
- Close button and click-outside-to-close functionality
- Keyboard support (ESC key to close)

### 3. Responsive Design
- Mobile-friendly layout
- Touch-enabled scrolling
- Adaptive sizing for different screen sizes

## File Structure

```
php/
├── sobre.php              # Main timeline page
├── timeline-data.php      # Timeline data array
├── config.php            # Configuration
├── includes/
│   ├── header.php        # Header template
│   └── footer.php        # Footer template
└── .htaccess            # URL rewriting rules
```

## Usage

### Accessing the Page

The timeline page is accessible at:
```
https://your-domain.com/sobre
```

### Timeline Data Structure

The timeline data is defined in `timeline-data.php` with the following structure:

```php
[
    'year' => '1984',                    // Year to display
    'title' => 'Event Title',            // Event title
    'image' => 'https://...',            // Image URL
    'description' => 'Event description' // Full description
]
```

### Adding New Timeline Items

To add a new milestone:

1. Open `php/timeline-data.php`
2. Add a new array entry following the existing format:

```php
[
    'year' => '2026',
    'title' => 'New Milestone',
    'image' => 'https://your-image-url.jpg',
    'description' => 'Description of the milestone...'
]
```

3. Save the file - no other changes needed!

## Features Breakdown

### Year Navigation
- Circular year buttons at the top
- Active years highlighted in red gradient
- Progress line animates as you scroll
- Click any year to jump to that section

### Image Modal
- **Opening**: Click any timeline image
- **Closing**:
  - Click the X button
  - Click outside the image
  - Press ESC key
- **Features**:
  - Full-screen overlay
  - Backdrop blur effect
  - Image caption display
  - Smooth animations
  - Responsive sizing

### Scroll Behavior
- Horizontal scroll container
- Custom styled scrollbar (red theme)
- Auto-updates year buttons while scrolling
- Smooth scroll to specific years

## Customization

### Colors

The timeline uses these brand colors defined in Tailwind config:
- `pian-red`: #DC2626
- `pian-yellow`: #FDD528
- `pian-black`: #1A1A1A

To change colors, update the classes in `sobre.php`.

### Animations

Modal animation timing can be adjusted in the CSS:

```css
@keyframes modalFadeIn {
    from {
        opacity: 0;
        transform: scale(0.85);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}

.modal-content {
    animation: modalFadeIn 0.3s ease-out; /* Change duration here */
}
```

### Scroll Behavior

Adjust scroll speed by modifying the `behavior` property:

```javascript
container.scrollTo({
    left: scrollLeft,
    behavior: 'smooth' // or 'auto' for instant
});
```

## Browser Compatibility

- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support
- Mobile browsers: Full support

## Dependencies

- PHP 7.0+
- Tailwind CSS (via CDN)
- No JavaScript libraries required (vanilla JS)

## Server Requirements

- Apache with mod_rewrite enabled
- PHP 7.0 or higher
- Write permissions for .htaccess

## Deployment

1. Upload the `php/` directory to your web server
2. Ensure `.htaccess` is in the root PHP directory
3. Verify mod_rewrite is enabled in Apache
4. Access the page at `/sobre`

## Troubleshooting

### Images not loading
- Check image URLs in `timeline-data.php`
- Verify internet connection (images are hosted externally)
- Fallback images will display if primary image fails

### Modal not opening
- Check browser console for JavaScript errors
- Verify all JavaScript is properly loaded
- Test with different browsers

### Scrolling not smooth
- Ensure CSS `scroll-behavior: smooth` is supported
- Check if JavaScript scroll function is executing
- Try in a different browser

### Year buttons not updating
- Check JavaScript console for errors
- Verify event listeners are attached
- Ensure DOM is fully loaded before script execution

## Performance

- Images lazy-load as you scroll
- Optimized animations using CSS transforms
- Minimal JavaScript execution
- Efficient DOM manipulation

## SEO

The page includes:
- Proper meta tags (title, description)
- Semantic HTML structure
- Alt text for all images
- Meaningful heading hierarchy

## Accessibility

- Keyboard navigation support (ESC to close modal)
- Alt text for images
- Proper contrast ratios
- Focus states for interactive elements
- Screen reader friendly structure

## Future Enhancements

Potential improvements:
- Add image zoom/pan in modal
- Navigation arrows in modal (prev/next image)
- Autoplay timeline animation
- Filter by decade
- Search functionality
- Export timeline as PDF
- Social sharing buttons

## Support

For issues or questions, contact the development team.
