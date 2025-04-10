/**
 * Logger frontend avancé - Capture et stocke les logs de la console avec détails étendus
 */

// Stocker les logs
let logs = [];
let isInitialized = false;

// Sauvegarder les méthodes console originales
const originalConsole = {
  log: console.log,
  warn: console.warn,
  error: console.error,
  info: console.info,
  debug: console.debug,
  trace: console.trace,
  dir: console.dir,
  table: console.table,
  assert: console.assert
};

// Sauvegarder les méthodes fetch et XMLHttpRequest originales pour le monitoring réseau
const originalFetch = window.fetch;
const originalXHROpen = XMLHttpRequest.prototype.open;
const originalXHRSend = XMLHttpRequest.prototype.send;

/**
 * Obtient la stack trace actuelle
 * @returns {string} Stack trace formatée
 */
const getStackTrace = () => {
  try {
    throw new Error('Logger stack trace');
  } catch (e) {
    // Enlever les premières lignes qui correspondent à getStackTrace et au logger lui-même
    return e.stack.split('\n').slice(3).join('\n');
  }
};

/**
 * Extrait le contexte (fichier, ligne) d'où provient l'appel de log
 * @param {string} stack - Stack trace
 * @returns {Object} Informations de contexte
 */
const extractContext = (stack) => {
  // Format typique: "    at FunctionName (file.js:line:column)"
  const stackLine = stack.split('\n')[0] || '';
  const match = stackLine.match(/\(([^:]+):(\d+):(\d+)\)/) || 
                stackLine.match(/at\s+([^:]+):(\d+):(\d+)/);
  
  if (match) {
    const [, filePath, line, column] = match;
    const fileName = filePath.split('/').pop();
    return { fileName, filePath, line, column };
  }
  
  return { fileName: 'unknown', filePath: 'unknown', line: '?', column: '?' };
};

/**
 * Formatter un objet de façon détaillée et sécurisée
 * @param {*} obj - Objet à formatter
 * @param {number} depth - Profondeur de récursion maximale
 * @returns {string} Représentation formatée
 */
const formatObject = (obj, depth = 5) => {
  if (depth <= 0) return '[Object: Max depth reached]';
  
  try {
    if (obj === null) return 'null';
    if (obj === undefined) return 'undefined';
    
    if (obj instanceof Error) {
      return `${obj.name}: ${obj.message}\nStack: ${obj.stack || 'No stack trace'}`;
    }
    
    if (obj instanceof HTMLElement) {
      return `[HTMLElement: <${obj.tagName.toLowerCase()}${obj.id ? ` id="${obj.id}"` : ''}${obj.className ? ` class="${obj.className}"` : ''}>]`;
    }
    
    if (obj instanceof Date) {
      return `Date: ${obj.toISOString()}`;
    }
    
    if (Array.isArray(obj)) {
      if (obj.length === 0) return '[]';
      
      const items = obj.slice(0, 50).map(item => {
        if (typeof item === 'object' && item !== null) {
          return formatObject(item, depth - 1);
        }
        return String(item);
      });
      
      if (obj.length > 50) {
        items.push(`... ${obj.length - 50} more items`);
      }
      
      return `[${items.join(', ')}]`;
    }
    
    if (typeof obj === 'object') {
      if (Object.keys(obj).length === 0) return '{}';
      
      try {
        // Essayer d'abord JSON.stringify pour une représentation standard
        return JSON.stringify(obj, null, 2);
      } catch (e) {
        // Si JSON.stringify échoue, faire une représentation manuelle
        const entries = Object.entries(obj).slice(0, 20);
        const result = entries.map(([key, value]) => {
          const formattedValue = typeof value === 'object' && value !== null
            ? formatObject(value, depth - 1)
            : String(value);
          return `${key}: ${formattedValue}`;
        });
        
        if (Object.keys(obj).length > 20) {
          result.push(`... ${Object.keys(obj).length - 20} more properties`);
        }
        
        return `{ ${result.join(', ')} }`;
      }
    }
    
    // Pour les fonctions, montrer leur signature
    if (typeof obj === 'function') {
      return `[Function: ${obj.name || 'anonymous'}]`;
    }
    
    // Pour les types primitifs
    return String(obj);
  } catch (e) {
    return `[Object: Failed to format - ${e.message}]`;
  }
};

/**
 * Formatter un message de log avec contexte et détails
 * @param {string} type - Type de log
 * @param {Array} args - Arguments passés à la console
 * @returns {Object} Entrée de log formatée
 */
const formatLogMessage = (type, args) => {
  const timestamp = new Date().toISOString();
  const stack = getStackTrace();
  const context = extractContext(stack);
  
  // Formatter chaque argument individuellement
  const formattedArgs = args.map(arg => {
    if (typeof arg === 'object' && arg !== null) {
      return formatObject(arg);
    }
    return String(arg);
  });
  
  // Joindre les arguments pour le message principal
  const message = formattedArgs.join(' ');
  
  return { 
    timestamp, 
    type: type.toUpperCase(), 
    message,
    context,
    stack
  };
};

// Initialiser le logger
const initLogger = () => {
  if (isInitialized) return;
  
  logs.push({ 
    timestamp: new Date().toISOString(), 
    type: 'SYSTEM', 
    message: '====== DÉMARRAGE LOGGER FRONTEND ======',
    context: { fileName: 'logger.js', filePath: 'logger.js', line: '1', column: '1' },
    userAgent: navigator.userAgent,
    url: window.location.href,
    screenSize: `${window.innerWidth}x${window.innerHeight}`
  });

  // Remplacer les méthodes de console
  console.log = function() {
    const logEntry = formatLogMessage('log', Array.from(arguments));
    logs.push(logEntry);
    originalConsole.log.apply(console, arguments);
  };

  console.warn = function() {
    const logEntry = formatLogMessage('warn', Array.from(arguments));
    logs.push(logEntry);
    originalConsole.warn.apply(console, arguments);
  };

  console.error = function() {
    const logEntry = formatLogMessage('error', Array.from(arguments));
    logs.push(logEntry);
    originalConsole.error.apply(console, arguments);
  };

  console.info = function() {
    const logEntry = formatLogMessage('info', Array.from(arguments));
    logs.push(logEntry);
    originalConsole.info.apply(console, arguments);
  };
  
  console.debug = function() {
    const logEntry = formatLogMessage('debug', Array.from(arguments));
    logs.push(logEntry);
    originalConsole.debug.apply(console, arguments);
  };
  
  console.trace = function() {
    const logEntry = formatLogMessage('trace', Array.from(arguments));
    logs.push(logEntry);
    originalConsole.trace.apply(console, arguments);
  };
  
  console.dir = function(obj, options) {
    const logEntry = formatLogMessage('dir', [formatObject(obj, options?.depth || 2)]);
    logs.push(logEntry);
    originalConsole.dir.call(console, obj, options);
  };
  
  console.table = function(data, columns) {
    const logEntry = formatLogMessage('table', [`[Table data: ${formatObject(data)}]`]);
    logs.push(logEntry);
    originalConsole.table.call(console, data, columns);
  };
  
  console.assert = function(condition, ...args) {
    if (!condition) {
      const logEntry = formatLogMessage('assert', args.length ? args : ['Assertion failed']);
      logs.push(logEntry);
    }
    originalConsole.assert.apply(console, arguments);
  };

  // Capture des erreurs non gérées avec stack trace complète
  window.addEventListener('error', (event) => {
    const error = event.error || new Error(event.message);
    logs.push({
      timestamp: new Date().toISOString(),
      type: 'UNCAUGHT',
      message: `${error.name || 'Error'}: ${error.message}`,
      context: {
        fileName: event.filename || 'unknown',
        line: event.lineno || '?',
        column: event.colno || '?'
      },
      stack: error.stack || 'No stack trace available',
      target: event.target ? (event.target.tagName || 'unknown') : 'unknown'
    });
  });

  // Capture des rejets de promesse non gérés avec plus de détails
  window.addEventListener('unhandledrejection', (event) => {
    const reason = event.reason;
    const isError = reason instanceof Error;
    
    logs.push({
      timestamp: new Date().toISOString(),
      type: 'UNHANDLED',
      message: isError 
        ? `${reason.name}: ${reason.message}`
        : `Unhandled Promise Rejection: ${formatObject(reason)}`,
      stack: isError ? reason.stack : getStackTrace(),
      context: extractContext(isError ? reason.stack : getStackTrace())
    });
  });

  // Capture des performances de l'application
  if ('performance' in window && 'getEntriesByType' in performance) {
    // Ajouter les métriques de performance initiales
    try {
      const navEntry = performance.getEntriesByType('navigation')[0];
      if (navEntry) {
        logs.push({
          timestamp: new Date().toISOString(),
          type: 'PERFORMANCE',
          message: 'Initial page load metrics',
          data: {
            loadTime: navEntry.loadEventEnd - navEntry.startTime,
            domContentLoaded: navEntry.domContentLoadedEventEnd - navEntry.startTime,
            firstPaint: navEntry.responseEnd - navEntry.startTime,
            redirectCount: navEntry.redirectCount
          }
        });
      }
    } catch (e) {
      // Ignorer les erreurs de mesure de performance
    }
  }

  // Capture des performances réseau
  if (window.PerformanceObserver) {
    try {
      // Observer les requêtes réseau
      const networkObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          if (entry.entryType === 'resource') {
            logs.push({
              timestamp: new Date().toISOString(),
              type: 'NETWORK',
              message: `Resource loaded: ${entry.name}`,
              data: {
                duration: entry.duration,
                transferSize: entry.transferSize,
                initiatorType: entry.initiatorType,
                startTime: entry.startTime,
                responseEnd: entry.responseEnd
              }
            });
          }
        });
      });
      
      networkObserver.observe({ entryTypes: ['resource'] });
      
      // Observer les métriques de performance web
      const perfObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          logs.push({
            timestamp: new Date().toISOString(),
            type: 'PERF_METRIC',
            message: `Performance metric: ${entry.name}`,
            data: {
              value: entry.value,
              startTime: entry.startTime,
              duration: entry.duration
            }
          });
        });
      });
      
      perfObserver.observe({ entryTypes: ['paint', 'largest-contentful-paint', 'layout-shift', 'first-input', 'longtask'] });
    } catch (e) {
      console.warn('Performance Observer not fully supported:', e);
    }
  }

  // Intercepter les requêtes fetch pour les logger
  window.fetch = function(...args) {
    const url = args[0] instanceof Request ? args[0].url : String(args[0]);
    const method = args[0] instanceof Request ? args[0].method : (args[1]?.method || 'GET');
    
    const logEntry = {
      timestamp: new Date().toISOString(),
      type: 'FETCH',
      message: `${method} ${url}`,
      context: extractContext(getStackTrace())
    };
    
    logs.push(logEntry);
    
    return originalFetch.apply(this, args)
      .then(response => {
        // Cloner la réponse pour éviter de la consommer
        const clone = response.clone();
        
        logs.push({
          timestamp: new Date().toISOString(),
          type: 'FETCH_RESPONSE',
          message: `${method} ${url} - Status: ${clone.status}`,
          data: {
            status: clone.status,
            statusText: clone.statusText,
            headers: Array.from(clone.headers.entries()).reduce((obj, [key, value]) => {
              obj[key] = value;
              return obj;
            }, {})
          }
        });
        
        return response;
      })
      .catch(error => {
        logs.push({
          timestamp: new Date().toISOString(),
          type: 'FETCH_ERROR',
          message: `${method} ${url} - Error: ${error.message}`,
          stack: error.stack
        });
        
        throw error;
      });
  };
  
  // Intercepter les requêtes XMLHttpRequest
  XMLHttpRequest.prototype.open = function(method, url, ...args) {
    this._logger_url = url;
    this._logger_method = method;
    return originalXHROpen.apply(this, [method, url, ...args]);
  };
  
  XMLHttpRequest.prototype.send = function(...args) {
    const url = this._logger_url;
    const method = this._logger_method;
    
    logs.push({
      timestamp: new Date().toISOString(),
      type: 'XHR',
      message: `${method} ${url}`,
      context: extractContext(getStackTrace())
    });
    
    // Capturer la réponse et les erreurs
    this.addEventListener('load', () => {
      logs.push({
        timestamp: new Date().toISOString(),
        type: 'XHR_RESPONSE',
        message: `${method} ${url} - Status: ${this.status}`,
        data: {
          status: this.status,
          statusText: this.statusText,
          responseType: this.responseType,
          responseSize: this.responseText?.length || 0
        }
      });
    });
    
    this.addEventListener('error', () => {
      logs.push({
        timestamp: new Date().toISOString(),
        type: 'XHR_ERROR',
        message: `${method} ${url} - Network Error`,
        stack: getStackTrace()
      });
    });
    
    return originalXHRSend.apply(this, args);
  };

  // Capturer les logs du navigateur via la console (erreurs JS, warnings CSS, etc.)
  if (window.console) {
    // Certains navigateurs émettent des événements "error" globaux pour les erreurs de console
    // On a déjà configuré un listener pour ceux-ci plus haut
    
    // Écouter les erreurs de chargement d'images et autres ressources
    document.addEventListener('error', (event) => {
      const target = event.target;
      if (target && target.tagName) {
        logs.push({
          timestamp: new Date().toISOString(),
          type: 'RESOURCE_ERROR',
          message: `Failed to load ${target.tagName.toLowerCase()}: ${target.src || target.href || 'unknown resource'}`,
          context: {
            element: target.tagName.toLowerCase(),
            url: target.src || target.href || 'unknown'
          }
        });
      }
    }, true); // Utilisation de la phase de capture pour attraper les erreurs avant qu'elles ne se propagent
  }

  isInitialized = true;
  originalConsole.log('Logger frontend avancé initialisé - Capture détaillée activée');
};

// Télécharger les logs dans un fichier
const downloadLogs = () => {
  // Ajouter un message de fin
  logs.push({ 
    timestamp: new Date().toISOString(), 
    type: 'SYSTEM', 
    message: '====== TÉLÉCHARGEMENT DES LOGS ======' 
  });

  // Convertir les logs en format détaillé
  const logText = logs.map(log => {
    let entry = `[${log.timestamp}] [${log.type}]`;
    
    // Ajouter le contexte si disponible
    if (log.context) {
      entry += ` [${log.context.fileName}:${log.context.line}]`;
    }
    
    entry += ` ${log.message}`;
    
    // Ajouter la stack trace pour les erreurs ou si explicitement demandé
    if (log.stack && (log.type === 'ERROR' || log.type === 'UNCAUGHT' || log.type === 'UNHANDLED' || log.type === 'TRACE')) {
      entry += `\nStack Trace:\n${log.stack}`;
    }
    
    return entry;
  }).join('\n\n');

  // Créer un blob et un lien de téléchargement
  const blob = new Blob([logText], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `frontconsolelog_${new Date().toISOString().replace(/:/g, '-')}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  return 'Logs téléchargés';
};

// Injecter un bouton de téléchargement des logs dans l'interface
const injectLoggerButton = () => {
  if (document.getElementById('logger-download-button')) return;

  const button = document.createElement('button');
  button.id = 'logger-download-button';
  button.textContent = '📥 Logs';
  
  Object.assign(button.style, {
    position: 'fixed',
    bottom: '20px',
    right: '20px',
    zIndex: '9999',
    padding: '8px 12px',
    backgroundColor: '#444',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '12px',
    opacity: '0.7'
  });

  button.addEventListener('mouseenter', () => {
    button.style.opacity = '1';
  });

  button.addEventListener('mouseleave', () => {
    button.style.opacity = '0.7';
  });

  button.addEventListener('click', downloadLogs);
  document.body.appendChild(button);
};

// Vider les logs
const clearLogs = () => {
  logs = [{
    timestamp: new Date().toISOString(),
    type: 'SYSTEM',
    message: '====== LOGS EFFACÉS ======',
    context: { fileName: 'logger.js', filePath: 'logger.js', line: '1', column: '1' }
  }];
  return 'Logs effacés';
};

// Exposer l'API du logger
const Logger = {
  init: () => {
    initLogger();
    if (typeof window !== 'undefined') {
      // Attendre que le DOM soit chargé pour injecter le bouton
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', injectLoggerButton);
      } else {
        injectLoggerButton();
      }
    }
  },
  download: downloadLogs,
  clear: clearLogs,
  getLogs: () => [...logs],
  getOriginalConsole: () => originalConsole,
  // Nouvelle méthode pour loguer manuellement
  logCustom: (type, message, data) => {
    const entry = {
      timestamp: new Date().toISOString(),
      type: type.toUpperCase(),
      message,
      data: formatObject(data),
      context: extractContext(getStackTrace()),
      stack: getStackTrace()
    };
    logs.push(entry);
    return entry;
  }
};

export default Logger; 