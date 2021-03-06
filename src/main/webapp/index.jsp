<!doctype html>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spring"%>
<%@page
	import="org.springframework.web.servlet.support.RequestContextUtils"%>
<%@page import="java.util.Locale"%>
<%@ page language="java" pageEncoding="UTF-8"
	contentType="text/html; charset=utf-8"%>
<html>
<head>
<meta charset="utf-8">
<title>Scuola247 Desktop</title>
<!-- script per il servizio pingdom -->
<!-- script per il servizio pingdom -->
<!-- script per il servizio pingdom -->
<script>
		var _prum = [['id', '53807377abe53db63d882bf6'],
		             ['mark', 'firstbyte', (new Date()).getTime()]];
		(function() {
		    var s = document.getElementsByTagName('script')[0]
		      , p = document.createElement('script');
		    p.async = 'async';
		    p.src = '//rum-static.pingdom.net/prum.min.js';
		    s.parentNode.insertBefore(p, s);
		})();
</script>
<!-- script per il servizio google analytics -->
<!-- script per il servizio google analytics -->
<!-- script per il servizio google analytics -->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-41757616-5', 'scuola247.it');
  ga('send', 'pageview');

</script>
<link rel="icon" type="image/png" href="resources/images/favicon16.png"
	sizes="16x16">
<link rel="icon" type="image/png" href="resources/images/favicon32.png"
	sizes="32x32">
<link rel="icon" type="image/png" href="resources/images/favicon48.png"
	sizes="48x48">
<style>
	<%@ include file="loader.css" %>
</style>
${applicationScope.app_css}
</head>
<body>
	<div id="circularG">
		<div id="circularG_1" class="circularG"></div>
		<div id="circularG_2" class="circularG"></div>
		<div id="circularG_3" class="circularG"></div>
		<div id="circularG_4" class="circularG"></div>
		<div id="circularG_5" class="circularG"></div>
		<div id="circularG_6" class="circularG"></div>
		<div id="circularG_7" class="circularG"></div>
		<div id="circularG_8" class="circularG"></div>
	</div>

	<script>
    var app_context_path = '<%= request.getContextPath() %>';
  </script>

	<% Locale locale = RequestContextUtils.getLocale(request); %>
	<spring:eval expression="@environment.acceptsProfiles('development')"
		var="isDevelopment" />
	<% if ((Boolean)pageContext.getAttribute("isDevelopment")) { %>
	<script src="i18n.js"></script>
	<% } else { %>
	<script
		src="i18n-<%= locale %>_<spring:eval expression='@environment["application.version"]'/>.js"></script>
	<% } %>

	${applicationScope.app_js}

	<% if (locale != null && locale.getLanguage().toLowerCase().equals("de")) { %>
	<script
		src="<%= request.getContextPath() %>/resources/extjs-gpl/<spring:eval expression='@environment["extjs.version"]'/>/locale/ext-lang-de.js"></script>
	<% } else if (locale != null && locale.getLanguage().toLowerCase().equals("it")) { %>
	<script
		src="<%= request.getContextPath() %>/resources/extjs-gpl/<spring:eval expression='@environment["extjs.version"]'/>/locale/ext-lang-it.js"></script>
	<% } %>
	<!-- Fields required for history management -->
	<form id="history-form" class="x-hide-display">
		<input type="hidden" id="x-history-field" />
		<iframe id="x-history-frame"></iframe>
	</form>
</body>
</html>