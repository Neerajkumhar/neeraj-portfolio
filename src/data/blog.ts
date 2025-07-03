export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: number;
  tags: string[];
  image: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Building Scalable React Applications with TypeScript',
    excerpt: 'Learn how to structure and build maintainable React applications using TypeScript, focusing on best practices and architectural patterns.',
    content: `# Building Scalable React Applications with TypeScript

TypeScript has become the de facto standard for building large-scale React applications. In this post, we'll explore the best practices and architectural patterns that will help you build maintainable and scalable React applications.

## Why TypeScript?

TypeScript provides several benefits:
- **Type Safety**: Catch errors at compile time
- **Better IDE Support**: Enhanced autocomplete and refactoring
- **Improved Code Documentation**: Types serve as documentation
- **Easier Refactoring**: Confident code changes with type checking

## Project Structure

A well-organized project structure is crucial for scalability:

\`\`\`
src/
  components/
    common/
    layout/
  pages/
  hooks/
  context/
  types/
  utils/
\`\`\`

## Component Patterns

### 1. Prop Types Definition

Always define clear interfaces for your component props:

\`\`\`typescript
interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  onClick: () => void;
  children: React.ReactNode;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({ variant, size, onClick, children, disabled = false }) => {
  // Component implementation
};
\`\`\`

### 2. Generic Components

Create reusable components with generics:

\`\`\`typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
  keyExtractor: (item: T) => string;
}

function List<T>({ items, renderItem, keyExtractor }: ListProps<T>) {
  return (
    <ul>
      {items.map(item => (
        <li key={keyExtractor(item)}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}
\`\`\`

## State Management

For complex applications, consider using context with reducers:

\`\`\`typescript
interface AppState {
  user: User | null;
  loading: boolean;
  error: string | null;
}

type AppAction =
  | { type: 'SET_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string };

const appReducer = (state: AppState, action: AppAction): AppState => {
  switch (action.type) {
    case 'SET_USER':
      return { ...state, user: action.payload };
    // ... other cases
    default:
      return state;
  }
};
\`\`\`

## Testing with TypeScript

TypeScript makes testing more reliable:

\`\`\`typescript
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button variant="primary" size="md" onClick={() => {}}>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
\`\`\`

## Conclusion

TypeScript significantly improves the developer experience and code quality in React applications. By following these patterns and best practices, you'll be able to build scalable, maintainable applications that your team can work on confidently.

Remember: start small, be consistent, and gradually adopt more advanced patterns as your application grows.`,
    date: '2025-01-15',
    readTime: 8,
    tags: ['React', 'TypeScript', 'Best Practices'],
    image: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '2',
    title: 'Modern CSS Techniques for Better Web Design',
    excerpt: 'Explore the latest CSS features and techniques that will improve your web design workflow and create more engaging user experiences.',
    content: `# Modern CSS Techniques for Better Web Design

CSS has evolved dramatically in recent years, introducing powerful new features that make creating beautiful, responsive web designs easier than ever. Let's explore some of the most impactful modern CSS techniques.

## CSS Grid and Flexbox

### CSS Grid for Complex Layouts

CSS Grid is perfect for two-dimensional layouts:

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}
\`\`\`

### Flexbox for Component Layouts

Flexbox excels at one-dimensional layouts:

\`\`\`css
.flex-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}
\`\`\`

## CSS Custom Properties (Variables)

Custom properties enable dynamic styling:

\`\`\`css
:root {
  --primary-color: #3b82f6;
  --text-color: #1f2937;
  --spacing: 1rem;
}

.component {
  color: var(--text-color);
  padding: var(--spacing);
  border: 2px solid var(--primary-color);
}
\`\`\`

## Container Queries

Container queries allow responsive design based on container size:

\`\`\`css
.card-container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: flex;
    flex-direction: row;
  }
}
\`\`\`

## Modern Animations

### CSS Transforms and Transitions

\`\`\`css
.hover-effect {
  transform: translateY(0);
  transition: transform 0.3s ease;
}

.hover-effect:hover {
  transform: translateY(-4px);
}
\`\`\`

### CSS Animations

\`\`\`css
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-in {
  animation: fadeInUp 0.5s ease-out;
}
\`\`\`

## Conclusion

Modern CSS provides powerful tools for creating engaging web experiences. By mastering these techniques, you'll be able to create more efficient, maintainable, and visually appealing designs.

Keep experimenting with these features and stay updated with the latest CSS developments!`,
    date: '2025-01-10',
    readTime: 6,
    tags: ['CSS', 'Web Design', 'Frontend'],
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
  {
    id: '3',
    title: 'The Future of Web Development: Trends to Watch in 2025',
    excerpt: 'Discover the emerging trends and technologies that are shaping the future of web development, from AI integration to new frameworks.',
    content: `# The Future of Web Development: Trends to Watch in 2025

The web development landscape continues to evolve at a rapid pace. As we progress through 2025, several trends are emerging that will shape how we build web applications. Let's explore the key developments to watch.

## AI-Powered Development Tools

Artificial Intelligence is revolutionizing how we write code:

### Code Generation and Completion
- AI-powered IDEs provide intelligent code suggestions
- Automated testing and bug detection
- Natural language to code conversion

### Design to Code
- Tools that convert designs directly to code
- Automated responsive design generation
- AI-assisted component creation

## Web Assembly (WASM) Adoption

WebAssembly is enabling new possibilities:
- High-performance applications in the browser
- Porting desktop applications to the web
- Real-time graphics and gaming
- Cross-language compatibility

## Edge Computing and Serverless

The shift toward edge computing continues:
- Reduced latency through global distribution
- Serverless functions at the edge
- Better user experiences worldwide
- Cost-effective scaling

## Progressive Web Apps (PWAs) Evolution

PWAs are becoming more capable:
- App-like experiences on the web
- Offline functionality improvements
- Better device integration
- Enhanced performance metrics

## JavaScript Runtime Evolution

New JavaScript runtimes are emerging:
- Deno's continued growth
- Bun's performance improvements
- Edge runtime compatibility
- Better TypeScript support

## Micro-Frontends Architecture

Large applications are adopting micro-frontends:
- Independent team development
- Technology diversity
- Scalable deployment strategies
- Improved maintainability

## Web3 Integration

Blockchain and web3 technologies:
- Decentralized applications (dApps)
- Smart contract integration
- Cryptocurrency payments
- NFT marketplaces

## Sustainability in Web Development

Environmental consciousness is growing:
- Green hosting solutions
- Optimized code for efficiency
- Reduced data transfer
- Sustainable development practices

## Accessibility-First Design

Accessibility is becoming a priority:
- Built-in accessibility tools
- Automated accessibility testing
- Inclusive design patterns
- Legal compliance requirements

## Low-Code/No-Code Platforms

Democratizing web development:
- Visual development environments
- Faster prototyping
- Business user empowerment
- Professional developer tools

## Conclusion

The future of web development is exciting and full of opportunities. These trends will shape how we build applications, making them more accessible, performant, and user-friendly.

Stay curious, keep learning, and embrace these changes to remain competitive in the evolving web development landscape.`,
    date: '2025-01-05',
    readTime: 10,
    tags: ['Web Development', 'Trends', 'Future Tech'],
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=600',
  },
];