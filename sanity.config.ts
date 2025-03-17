'use client'

import { defineConfig } from 'sanity'
import { structure } from './src/sanity/structure'
// import { presentation } from './src/sanity/presentation'
import {
	dashboardTool,
	projectInfoWidget,
	projectUsersWidget,
} from '@sanity/dashboard'
import { sanitypressGuideWidget } from './src/sanity/sanitypressGuideWidget'
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel'
import { visionTool } from '@sanity/vision'
import { codeInput } from '@sanity/code-input'
import { schemaTypes } from './src/sanity/schemas'
import { schemaMarkup } from '@operationnation/sanity-plugin-schema-markup';


const singletonTypes = ['site']
export default defineConfig({
	projectId: 'py28v9g1', // Your Sanity project ID
	dataset: 'production', // Your dataset name
	basePath: '/admin',

	plugins: [
		structure,
		// presentation,
		dashboardTool({
			name: 'deployment',
			title: 'Deployment',
			widgets: [vercelWidget()],
		}),
		dashboardTool({
			name: 'info',
			title: 'Info',
			widgets: [
				projectInfoWidget(),
				projectUsersWidget(),
				sanitypressGuideWidget(),
			],
		}),
		visionTool(),
		codeInput(),
		schemaMarkup(),
	],

	tasks: { enabled: false },
	scheduledPublishing: { enabled: false },

	schema: {
		types: schemaTypes,
		templates: (templates) =>
			templates.filter(
				({ schemaType }) => !singletonTypes.includes(schemaType),
			),
	},

	document: {
		actions: (input, { schemaType }) =>
			singletonTypes.includes(schemaType)
				? input.filter(
						({ action }) =>
							action &&
							['publish', 'discardChanges', 'restore'].includes(action),
					)
				: input,
	},
})
