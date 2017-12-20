'use strict';

import * as Joi from 'joi';
import { MiddlewareConfig, middlewareConfigValidatorSchema } from './middleware';

export interface StatsConfig {
    /**
     * The time serie granularity configuration
     */
    granularity: GranularityConfig;
    /**
     * A prefix for the timeseries keys on database ()
     */
    prefix?: string;
    /**
     * Middleware to map request to statistics log entries
     */
    requestMapper?: MiddlewareConfig;
}

export interface GranularityConfig {
    /**
     * The amout of time used to agregate the time series
     */
    duration: string;
    /**
     * Time to live for each time serie
     */
    ttl: string;
}

const granularityValidatorSchema = Joi.object().keys({
    duration: Joi.string().required(),
    ttl: Joi.string().required(),
});

export const statsConfigValidatorSchema = Joi.object().keys({
    granularity: granularityValidatorSchema.required(),
    prefix: Joi.string(),
    requestMapper: middlewareConfigValidatorSchema
});
