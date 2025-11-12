// Professional Code Examples Showcase
// Display professional code samples in multiple languages

export interface CodeExample {
  id: string;
  title: string;
  language: string;
  category: string;
  description: string;
  code: string;
  explanation: string;
  tags: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export const codeExamples: CodeExample[] = [
  // JavaScript/TypeScript Examples
  {
    id: 'js-1',
    title: 'Modern React Hook - useAsync',
    language: 'TypeScript',
    category: 'React',
    description: 'Custom React hook for handling async operations with loading, error, and data states',
    code: `import { useState, useEffect, useCallback } from 'react';

interface AsyncState<T> {
  status: 'idle' | 'pending' | 'success' | 'error';
  data?: T;
  error?: Error;
}

export function useAsync<T>(
  asyncFunction: () => Promise<T>,
  immediate = true
): AsyncState<T> {
  const [state, setState] = useState<AsyncState<T>>({
    status: 'idle',
  });

  const execute = useCallback(async () => {
    setState({ status: 'pending' });
    try {
      const response = await asyncFunction();
      setState({ status: 'success', data: response });
      return response;
    } catch (error) {
      setState({ status: 'error', error: error as Error });
    }
  }, [asyncFunction]);

  useEffect(() => {
    if (immediate) execute();
  }, [execute, immediate]);

  return state;
}`,
    explanation: 'This custom hook abstracts async operation logic, making it reusable across components. It manages loading states, errors, and data efficiently while following React best practices.',
    tags: ['React', 'Hooks', 'TypeScript', 'Async'],
    difficulty: 'Intermediate'
  },

  {
    id: 'js-2',
    title: 'Event Emitter Pattern',
    language: 'TypeScript',
    category: 'Design Patterns',
    description: 'Publisher-Subscriber pattern implementation for event-driven architecture',
    code: `type EventListener<T = any> = (data: T) => void;

class EventEmitter {
  private events: Map<string, EventListener[]> = new Map();

  on<T>(eventName: string, listener: EventListener<T>): void {
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName)!.push(listener);
  }

  emit<T>(eventName: string, data: T): void {
    const listeners = this.events.get(eventName);
    if (listeners) {
      listeners.forEach(listener => listener(data));
    }
  }

  off(eventName: string, listener: EventListener): void {
    const listeners = this.events.get(eventName);
    if (listeners) {
      const index = listeners.indexOf(listener);
      if (index !== -1) listeners.splice(index, 1);
    }
  }
}

// Usage
const emitter = new EventEmitter();
emitter.on('user-login', (userData) => {
  console.log('User logged in:', userData);
});
emitter.emit('user-login', { id: 1, name: 'John' });`,
    explanation: 'Event Emitter provides a clean way to handle communication between components without tight coupling. Perfect for application-wide event handling.',
    tags: ['Design Pattern', 'TypeScript', 'Events'],
    difficulty: 'Intermediate'
  },

  {
    id: 'js-3',
    title: 'Debounce & Throttle Utilities',
    language: 'TypeScript',
    category: 'Utilities',
    description: 'Performance optimization utilities for handling frequent function calls',
    code: `// Debounce - Execute function after delay
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
}

// Throttle - Limit function calls frequency
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let lastFunc: NodeJS.Timeout;
  let lastRan: number;
  return (...args: Parameters<T>) => {
    if (!lastRan) {
      func(...args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func(...args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
}

// Usage
const handleScroll = throttle(() => console.log('Scrolling'), 1000);
window.addEventListener('scroll', handleScroll);`,
    explanation: 'Debounce delays execution until activity stops; Throttle limits execution frequency. Essential for optimizing performance with high-frequency events like scrolling and typing.',
    tags: ['Performance', 'TypeScript', 'Optimization'],
    difficulty: 'Intermediate'
  },

  // Python Examples
  {
    id: 'py-1',
    title: 'Async Data Processing',
    language: 'Python',
    category: 'Backend',
    description: 'Asynchronous data processing using Python async/await for concurrent operations',
    code: `import asyncio
from typing import List, Any
from dataclasses import dataclass

@dataclass
class DataProcessor:
    """Process large datasets asynchronously"""
    
    async def fetch_data(self, url: str) -> dict:
        """Simulate async data fetch"""
        await asyncio.sleep(1)  # Simulate network delay
        return {'url': url, 'data': 'processed'}
    
    async def process_batch(self, urls: List[str]) -> List[dict]:
        """Process multiple URLs concurrently"""
        tasks = [self.fetch_data(url) for url in urls]
        results = await asyncio.gather(*tasks)
        return results
    
    async def pipeline(self, data: List[str]) -> dict:
        """Complete processing pipeline"""
        processed = await self.process_batch(data)
        return {
            'count': len(processed),
            'results': processed,
            'status': 'completed'
        }

# Usage
async def main():
    processor = DataProcessor()
    urls = ['url1', 'url2', 'url3']
    result = await processor.pipeline(urls)
    print(result)

asyncio.run(main())`,
    explanation: 'Async/await enables concurrent operations, dramatically improving performance when handling I/O-bound tasks like API calls and database queries.',
    tags: ['Python', 'Async', 'Backend', 'Concurrency'],
    difficulty: 'Advanced'
  },

  {
    id: 'py-2',
    title: 'Decorator Pattern Implementation',
    language: 'Python',
    category: 'Design Patterns',
    description: 'Python decorators for cross-cutting concerns like logging, caching, and authentication',
    code: `from functools import wraps
from typing import Callable, Any
import time

def timer_decorator(func: Callable) -> Callable:
    """Measure function execution time"""
    @wraps(func)
    def wrapper(*args: Any, **kwargs: Any) -> Any:
        start = time.time()
        result = func(*args, **kwargs)
        elapsed = time.time() - start
        print(f"{func.__name__} took {elapsed:.4f}s")
        return result
    return wrapper

def retry_decorator(max_attempts: int = 3) -> Callable:
    """Retry failed function calls"""
    def decorator(func: Callable) -> Callable:
        @wraps(func)
        def wrapper(*args: Any, **kwargs: Any) -> Any:
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"Attempt {attempt + 1} failed, retrying...")
            return None
        return wrapper
    return decorator

@timer_decorator
@retry_decorator(max_attempts=3)
def fetch_data(url: str) -> dict:
    """Fetch data with retry and timing"""
    return {'url': url, 'status': 'success'}`,
    explanation: 'Decorators provide elegant ways to add functionality to functions without modifying the original code. Great for cross-cutting concerns like logging and error handling.',
    tags: ['Python', 'Decorators', 'Design Patterns'],
    difficulty: 'Intermediate'
  },

  {
    id: 'py-3',
    title: 'Generator & Context Manager',
    language: 'Python',
    category: 'Advanced Features',
    description: 'Memory-efficient data processing with generators and resource management with context managers',
    code: `from contextlib import contextmanager
from typing import Generator, Any

def data_generator(large_file: str) -> Generator[str, None, None]:
    """Process large file line by line efficiently"""
    with open(large_file, 'r') as f:
        for line in f:
            yield line.strip()

@contextmanager
def database_connection(db_url: str) -> Generator[Any, None, None]:
    """Ensure database connection is properly closed"""
    print(f"Connecting to {db_url}")
    connection = {'url': db_url, 'connected': True}
    try:
        yield connection
    finally:
        print("Closing connection")
        connection['connected'] = False

# Usage
with database_connection('postgres://localhost') as db:
    print(f"Database: {db['url']}")
    # Query database

for line in data_generator('large_file.txt'):
    print(f"Processing: {line[:50]}...")`,
    explanation: 'Generators use lazy evaluation to process large datasets with minimal memory. Context managers ensure proper resource cleanup in critical sections.',
    tags: ['Python', 'Generators', 'Memory Efficiency'],
    difficulty: 'Advanced'
  },

  // Java Examples
  {
    id: 'java-1',
    title: 'Fluent API Builder Pattern',
    language: 'Java',
    category: 'Design Patterns',
    description: 'Builder pattern with fluent interface for clean object construction',
    code: `public class QueryBuilder {
    private String select = "*";
    private String from;
    private String where;
    private String orderBy;
    private int limit = -1;

    public QueryBuilder select(String columns) {
        this.select = columns;
        return this;
    }

    public QueryBuilder from(String table) {
        this.from = table;
        return this;
    }

    public QueryBuilder where(String condition) {
        this.where = condition;
        return this;
    }

    public QueryBuilder orderBy(String column) {
        this.orderBy = column;
        return this;
    }

    public QueryBuilder limit(int rows) {
        this.limit = rows;
        return this;
    }

    public String build() {
        StringBuilder query = new StringBuilder();
        query.append("SELECT ").append(select).append(" FROM ").append(from);
        if (where != null) query.append(" WHERE ").append(where);
        if (orderBy != null) query.append(" ORDER BY ").append(orderBy);
        if (limit > 0) query.append(" LIMIT ").append(limit);
        return query.toString();
    }
}

// Usage
String query = new QueryBuilder()
    .select("id, name, email")
    .from("users")
    .where("age > 18")
    .orderBy("name")
    .limit(10)
    .build();`,
    explanation: 'The Builder pattern with fluent interface creates readable, chainable code for complex object construction. Essential for clean API design.',
    tags: ['Java', 'Builder', 'Fluent API'],
    difficulty: 'Intermediate'
  },

  {
    id: 'java-2',
    title: 'Generic Repository Pattern',
    language: 'Java',
    category: 'Backend',
    description: 'Generic repository for database operations with type safety',
    code: `import java.util.*;

public interface Repository<T, ID> {
    T save(T entity);
    Optional<T> findById(ID id);
    List<T> findAll();
    void delete(T entity);
    long count();
}

public class GenericRepository<T, ID> implements Repository<T, ID> {
    private final Map<ID, T> data = new HashMap<>();

    @Override
    public T save(T entity) {
        // ID extraction logic
        data.put((ID) getEntityId(entity), entity);
        return entity;
    }

    @Override
    public Optional<T> findById(ID id) {
        return Optional.ofNullable(data.get(id));
    }

    @Override
    public List<T> findAll() {
        return new ArrayList<>(data.values());
    }

    @Override
    public void delete(T entity) {
        data.remove((ID) getEntityId(entity));
    }

    @Override
    public long count() {
        return data.size();
    }

    private Object getEntityId(T entity) {
        // Extract ID from entity
        return null;
    }
}

// Usage
Repository<User, Long> userRepo = new GenericRepository<>();
User user = new User("John", "john@example.com");
userRepo.save(user);
Optional<User> found = userRepo.findById(1L);`,
    explanation: 'Generic repositories eliminate boilerplate code while maintaining type safety. A powerful abstraction for data access layers.',
    tags: ['Java', 'Generics', 'Repository Pattern'],
    difficulty: 'Intermediate'
  },

  {
    id: 'java-3',
    title: 'Reactive Stream Processing',
    language: 'Java',
    category: 'Advanced',
    description: 'Reactive stream processing for handling asynchronous data flows',
    code: `import java.util.concurrent.*;
import java.util.stream.*;

public class ReactiveStream<T> {
    private final BlockingQueue<T> queue = new LinkedBlockingQueue<>();
    private volatile boolean running = true;

    public void emit(T value) {
        try {
            queue.put(value);
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
        }
    }

    public void subscribe(Consumer<T> observer) {
        ExecutorService executor = Executors.newSingleThreadExecutor();
        executor.submit(() -> {
            while (running) {
                try {
                    T value = queue.take();
                    observer.accept(value);
                } catch (InterruptedException e) {
                    Thread.currentThread().interrupt();
                    break;
                }
            }
        });
    }

    public void stop() {
        running = false;
    }

    public static void main(String[] args) {
        ReactiveStream<String> stream = new ReactiveStream<>();
        
        stream.subscribe(value -> 
            System.out.println("Received: " + value)
        );
        
        stream.emit("Event 1");
        stream.emit("Event 2");
        stream.emit("Event 3");
        
        stream.stop();
    }
}`,
    explanation: 'Reactive streams handle asynchronous data flows elegantly. Perfect for event-driven systems and real-time data processing.',
    tags: ['Java', 'Reactive', 'Streams', 'Async'],
    difficulty: 'Advanced'
  },

  // Additional Professional Examples
  {
    id: 'js-4',
    title: 'Memoization Hook',
    language: 'TypeScript',
    category: 'React',
    description: 'Advanced memoization for expensive computations in React',
    code: `import { useRef, useCallback } from 'react';

function useMemoizedCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: React.DependencyList
): T {
  const cacheRef = useRef(new Map());
  
  return useCallback((...args: any[]) => {
    const key = JSON.stringify(args);
    
    if (cacheRef.current.has(key)) {
      return cacheRef.current.get(key);
    }
    
    const result = callback(...args);
    cacheRef.current.set(key, result);
    return result;
  }, deps) as T;
}

// Usage
function ExpensiveComponent({ data }: { data: number[] }) {
  const calculateSum = useMemoizedCallback(
    (nums: number[]) => nums.reduce((a, b) => a + b, 0),
    []
  );
  
  return <div>Sum: {calculateSum(data)}</div>;
}`,
    explanation: 'Memoization caches function results based on inputs, preventing unnecessary recalculations. Critical for performance in data-heavy applications.',
    tags: ['React', 'Performance', 'TypeScript'],
    difficulty: 'Advanced'
  },

  {
    id: 'py-4',
    title: 'OOP Best Practices',
    language: 'Python',
    category: 'Object-Oriented',
    description: 'Professional Python class design with properties, inheritance, and polymorphism',
    code: `from abc import ABC, abstractmethod
from typing import List

class DataModel(ABC):
    """Abstract base class for data models"""
    
    @abstractmethod
    def validate(self) -> bool:
        pass
    
    @abstractmethod
    def to_dict(self) -> dict:
        pass

class User(DataModel):
    def __init__(self, name: str, email: str, age: int):
        self._name = name
        self._email = email
        self._age = age
    
    @property
    def name(self) -> str:
        return self._name
    
    @property
    def email(self) -> str:
        return self._email
    
    @property
    def age(self) -> int:
        return self._age
    
    @age.setter
    def age(self, value: int) -> None:
        if value < 0:
            raise ValueError("Age cannot be negative")
        self._age = value
    
    def validate(self) -> bool:
        return bool(self._name and "@" in self._email and self._age >= 0)
    
    def to_dict(self) -> dict:
        return {
            "name": self._name,
            "email": self._email,
            "age": self._age
        }

# Usage
user = User("John Doe", "john@example.com", 30)
print(user.validate())
print(user.to_dict())`,
    explanation: 'Professional Python uses abstract base classes, properties with validation, and proper encapsulation. This pattern ensures maintainability and extensibility.',
    tags: ['Python', 'OOP', 'Design'],
    difficulty: 'Intermediate'
  }
];
