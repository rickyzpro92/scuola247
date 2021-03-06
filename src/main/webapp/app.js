/* <debug> */
Ext.Loader.setConfig({
	enabled: true,
	paths: {
		'Desktop': 'app',
		'Ext.ux': 'resources/extjs-gpl/4.2.2/ux'
	}
});
/* </debug> */

Ext.define('DesktopApp', {
	extend: 'Deft.mvc.Application',
	requires: [ 'overrides.AbstractMixedCollection', 'overrides.Window', 'Desktop.ux.window.Notification', 'Desktop.view.Viewport', 'Desktop.shared.SharedStorage', 'Desktop.ux.util.ExceptionDecoder' ],

	init: function() {
		Ext.fly('circularG').destroy();
		
		var heartbeat = new Ext.direct.PollingProvider({
			type: 'polling',
			interval: 5 * 60 * 1000, // 5 minutes
			url: Ext.app.POLLING_URLS.heartbeat
		});
		Ext.app.REMOTING_API.id = 'remoting';
		Ext.direct.Manager.addProvider(Ext.app.REMOTING_API, heartbeat);
	
	    function createCustomExtLogFunction(defaultConfig) {
	        return function(arg1) {
	            var arg1IsConfig = Ext.isObject(arg1);
	            var configArg = (arg1IsConfig ? arg1 : {});
	            var otherArgs = [].slice.call(arguments, (arg1IsConfig ? 1 : 0));                
	            Ext.applyIf(configArg, defaultConfig);
	            return Ext.log.apply(this, [configArg].concat(otherArgs));
	        };
	    }	
		
	    Ext.applyIf(Ext, {
	        logDebug: createCustomExtLogFunction({level: 'debug'}),
	        logInfo: createCustomExtLogFunction({level: 'info'}),
	        logWarn: createCustomExtLogFunction({level: 'warn'}),
	        logError: createCustomExtLogFunction({level: 'error', stack: true})
	    });
		
		Ext.tip.QuickTipManager.init();

		if (this.hasLocalstorage()) {
			Ext.state.Manager.setProvider(Ext.create('Ext.state.LocalStorageProvider'));
		} else {
			Ext.state.Manager.setProvider(Ext.create('Ext.state.CookieProvider'));
		}

		if (Ext.view.AbstractView) {
			Ext.view.AbstractView.prototype.loadingText = i18n.loading;
		}

		this.setupGlobalErrorHandler();

		Ext.direct.Manager.on('event', function(e) {
			if (e.code && e.code === 'parse') {
				window.location.reload();
			}
		});

		Ext.direct.Manager.on('exception', function(e) {
			if (e.message === 'accessdenied') {
				Desktop.ux.window.Notification.error(i18n.error, i18n.error_accessdenied);
			} else {
				Desktop.ux.window.Notification.error(i18n.error, e.message);
			}
		});

		var prov = Ext.direct.Manager.getProvider('remoting');
		prov.on({
			call: function() {
				Ext.getCmp('server_connect_status').setSrc(app_context_path + '/resources/images/connect-on.gif');
			},
			data: function() {
				Ext.getCmp('server_connect_status').setSrc(app_context_path + '/resources/images/connect-off.gif');
			}
		});
		
		Ext.apply(Ext.form.field.VTypes, {
			password: function(val, field) {
				if (field.initialPassField) {
					var pwd = field.up('form').down('#' + field.initialPassField);
					return (val === pwd.getValue());
				}
				return true;
			},

			passwordText: i18n.user_passworddonotmatch
		});

		Deft.Injector.configure({
			messageBus: 'Ext.util.Observable',
			spaziLavoroStore: 'Desktop.store.SpaziLavoro',
			sharedStorage: 'Desktop.shared.SharedStorage'
		});

		Ext.create('Desktop.view.Viewport');
		
		
		
	},

	setupGlobalErrorHandler: function() {
		var existingFn = window.onerror;
		if (typeof existingFn === 'function') {
			window.onerror = Ext.Function.createSequence(existingFn, this.globalErrorHandler);
		} else {
			window.onerror = this.globalErrorHandler;
		}
	},

	globalErrorHandler: function(msg, url, line) {
		var message = msg + "-->" + url + "::" + line;
		logService.error(message);
	},

	hasLocalstorage: function() {
		try {
			return !!localStorage.getItem;
		} catch (e) {
			return false;
		}
	}
});

Ext.onReady(function() {
	Ext.create('DesktopApp');
	
	Ext.History.init();
	
	Ext.defer(function(){
		Ext.History.add('2');
		Ext.History.add('1');
	}, 300, this);
	    
	    
    // Handle this change event in order to restore the UI to the appropriate history state
    Ext.History.on('change', function(token){
        Ext.History.add('1');
    });
	
});