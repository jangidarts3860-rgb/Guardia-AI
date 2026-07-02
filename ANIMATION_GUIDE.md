# Guardia AI - Premium Animation & Gradient Implementation Guide

## Quick Start for Developers

### How to Use Animations in Components

#### Basic Entrance Animation
```tsx
<div className="animate-fade-in-up">Content</div>
<div className="animate-fade-in-down">Header</div>
<div className="animate-scale-in-spring">Card</div>
```

#### Staggered List Animation
```tsx
<div className="stagger-children">
  {items.map((item, idx) => (
    <div key={idx} style={{ animationDelay: `${0.1 * idx}s` }}>
      {item}
    </div>
  ))}
</div>
```

#### Continuous Loop Animation
```tsx
<div className="animate-float">Floating element</div>
<div className="animate-pulse-scale">Pulsing badge</div>
<div className="animate-drift">Drifting background</div>
```

#### Glowing Elements
```tsx
<div className="animate-glow-pulse">Purple glow</div>
<div className="animate-glow-pulse-lime">Lime glow</div>
<div className="animate-border-glow">Border glow effect</div>
```

### Gradient Classes

#### Background Gradients
```tsx
<div className="gradient-primary">Primary brand gradient</div>
<div className="gradient-lime">Lime accent gradient</div>
<div className="gradient-success">Success state</div>
<div className="gradient-danger">Error state</div>
<div className="gradient-aurora">Multi-color aurora</div>
```

#### Text Gradients
```tsx
<h1 className="text-gradient">Purple to pink text</h1>
<h2 className="text-gradient-lime">Lime to purple text</h2>
```

#### Glass-Morphism Effects
```tsx
<div className="glass-card">Dark glass effect</div>
<div className="glass-card-light">Light glass effect</div>
```

### Transition Classes

#### Smooth Transitions
```tsx
<button className="transition-smooth hover:scale-105">Smooth hover</button>
<div className="transition-smooth-fast">Fast transition</div>
<div className="transition-smooth-slow">Slow transition</div>
```

#### Hover Effects
```tsx
<div className="hover-lift">Lifts on hover</div>
<div className="hover-glow">Glows on hover</div>
<div className="hover-glow-lime">Lime glow on hover</div>
```

## Animation Timing Guide

| Animation | Duration | Use Case |
|-----------|----------|----------|
| `fadeInUp`, `fadeInDown` | 0.6s | Page section entrance |
| `slideInUp`, `slideInDown` | 0.7s | Drawer/modal entrance |
| `scaleIn` | 0.5s | Card or element appear |
| `scaleInSpring` | 0.8s | Bouncy entrance (hero cards) |
| `shimmer` | 3s infinite | Loading placeholder |
| `float`, `float-slow` | 3-4s infinite | Ambient background motion |
| `drift` | 4s infinite | Background orb movement |
| `pulse-scale` | 2s infinite | Attention pulse |
| `glow-pulse` | 2s infinite | Focus indicator |

## Color System Reference

### Brand Colors
```css
--primary-purple: #8537FD
--primary-pink: #E837FD
--accent-lime: #AFFD37
--accent-cyan: #38BDF8
--success-emerald: #10B981
--danger-red: #EF4444
```

### Background
```css
--bg-darkest: #0A0A0A
--bg-dark: #0F0F1E
--bg-darker: #070A13
```

### Opacity Scale
```css
white/5    /* 5% white - subtle backgrounds */
white/10   /* 10% - borders, dividers */
white/15   /* 15% - input fields */
white/20   /* 20% - interactive elements */
white/30   /* 30% - hover states */
```

## Component Animation Patterns

### Hero Card Pattern
```tsx
<div className="relative group">
  {/* Glow border effect */}
  <div className="absolute inset-0 bg-gradient-to-r from-[#8537FD] to-[#E837FD] rounded-3xl opacity-0 group-hover:opacity-40 blur-xl transition-opacity" />
  
  {/* Main card */}
  <div className="relative bg-gradient-to-br from-[#8537FD] to-[#E837FD] rounded-3xl p-6 animate-scale-in-spring">
    {/* Background orbs */}
    <div className="absolute -top-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-float" />
    {/* Content */}
  </div>
</div>
```

### Alert List Pattern
```tsx
<div className="stagger-children">
  {alerts.map((alert, idx) => (
    <button 
      key={alert.id}
      className="hover:shadow-lg hover:shadow-[#8537FD]/20 transition-all"
      style={{ animationDelay: `${0.1 * (idx + 1)}s` }}
    >
      {/* Alert content */}
    </button>
  ))}
</div>
```

### Action Grid Pattern
```tsx
<div className="grid grid-cols-4 gap-3 stagger-children">
  {actions.map((action) => (
    <button className="hover-lift group">
      <div className="w-12 h-12 rounded-2xl group-hover:shadow-lg group-hover:shadow-[color]/30 transition-all" />
    </button>
  ))}
</div>
```

## Advanced Techniques

### Animated Counter
```tsx
<span className="animate-count-up">{number}</span>
```

### Custom Stagger Delay
```tsx
<div 
  style={{ 
    animation: `fadeInUp 0.6s ease-out forwards`,
    animationDelay: `${0.15 * index}s`
  }}
>
  Item
</div>
```

### Conditional Animation
```tsx
<div className={mounted ? 'animate-fade-in-up' : 'opacity-0'}>
  Content (use mounted check for hydration)
</div>
```

### Combining Animations
```tsx
<div className="animate-float animate-glow-pulse">
  Floating element with glow
</div>
```

## Performance Tips

1. **Use transform-based animations** - They run on GPU
   - ✅ `scale`, `translateX`, `translateY`, `rotate`
   - ❌ `left`, `top`, `width`, `height`

2. **Limit blur effects** - They're expensive
   - Use `blur(20px)` maximum for backgrounds
   - Avoid on frequently updated elements

3. **Stagger carefully** - Too many simultaneous animations cause jank
   - Keep stagger increments at 0.1s minimum
   - Limit stagger groups to 6-8 items

4. **Use `will-change` sparingly**
   ```css
   .animated-element {
     will-change: transform, opacity;
   }
   ```

5. **Test on low-end devices**
   - Profile with Chrome DevTools
   - Ensure 60fps on mobile devices

## Responsive Animation Adjustments

For mobile (< 640px), consider:
- Shorter animation durations (200-300ms vs 400-600ms)
- Fewer simultaneous animations
- Simpler entrance effects

```tsx
<div className="md:animate-scale-in-spring animate-fade-in-up">
  Responsive animation
</div>
```

## Accessibility Considerations

### Respect prefers-reduced-motion
The current implementation uses standard animations. For full accessibility compliance, add:

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States
Always ensure animated elements maintain clear focus states for keyboard navigation:
```tsx
<button className="focus-visible:ring-2 focus-visible:ring-[#8537FD]">
  Action
</button>
```

## Browser Support

| Feature | Chrome | Safari | Firefox | Edge |
|---------|--------|--------|---------|------|
| CSS Animations | ✅ | ✅ | ✅ | ✅ |
| Transforms | ✅ | ✅ | ✅ | ✅ |
| Gradients | ✅ | ✅ | ✅ | ✅ |
| Blur Filter | ✅ | ✅ | ✅ | ✅ |
| Clip-path | ✅ | ✅ | ✅ | ✅ |

## Common Issues & Solutions

### Animation Not Playing
- Ensure element has `opacity: 1` or visible state
- Check if parent has `overflow: hidden` with animations
- Verify animation class is not overridden

### Animation Janky on Mobile
- Check for simultaneous blur effects
- Reduce number of animated elements
- Use `transform: translateZ(0)` for GPU acceleration

### Animation Timing Off
- Verify `animationDelay` matches stagger increment
- Check for conflicting CSS transitions
- Use browser DevTools animation inspector

## Future Enhancement Opportunities

1. **Framer Motion Integration** - For advanced choreography
2. **Scroll Trigger Animations** - Reveal on scroll effects
3. **Gesture Animations** - Swipe and drag feedback
4. **Page Transitions** - Route change animations
5. **Lottie Integration** - Complex illustrated animations
6. **Theme Toggle Animation** - Smooth dark/light switch

## Testing Your Animations

```tsx
// In your test file
describe('Animations', () => {
  it('should have fade-in-up animation class', () => {
    const element = screen.getByText('Content');
    expect(element).toHaveClass('animate-fade-in-up');
  });

  it('should apply stagger delays correctly', () => {
    const items = screen.getAllByRole('button');
    items.forEach((item, idx) => {
      expect(item).toHaveStyle(
        `animation-delay: ${0.1 * idx}s`
      );
    });
  });
});
```

## Questions & Support

For animation customization or issues, refer to:
- `globals.css` for animation definitions
- Component files for implementation examples
- UI_UPGRADE_SUMMARY.md for design philosophy
