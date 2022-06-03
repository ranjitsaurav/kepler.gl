// Copyright (c) 2022 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React from 'react';
import TimeRangeSliderFactory from 'components/common/time-range-slider';
import {DEFAULT_TIME_FORMAT} from 'constants/default-settings';
import {TimeRangeFilter} from 'reducers';
import {TimeRangeFilterProps} from './types';

/*
 * TimeRangeFilter -> TimeRangeSlider -> RangeSlider
 */
export function timeRangeSliderFieldsSelector(filter: TimeRangeFilter) {
  const hasUserFormat = typeof filter.timeFormat === 'string';
  const timeFormat =
    (hasUserFormat ? filter.timeFormat : filter.defaultTimeFormat) || DEFAULT_TIME_FORMAT;

  return {
    id: filter.id,
    domain: filter.domain,
    bins: filter.bins,
    value: filter.value,
    plotType: filter.plotType,
    lineChart: filter.lineChart,
    yAxis: filter.yAxis,
    step: filter.step,
    speed: filter.speed,
    histogram: filter.enlarged ? filter.enlargedHistogram : filter.histogram,
    isEnlarged: filter.enlarged,
    animationWindow: filter.animationWindow,
    isAnimating: filter.isAnimating,
    timezone: filter.timezone,
    timeFormat
  };
}

TimeRangeFilterFactory.deps = [TimeRangeSliderFactory];

function TimeRangeFilterFactory(TimeRangeSlider: ReturnType<typeof TimeRangeSliderFactory>) {
  const TimeRangeFilter: React.FC<TimeRangeFilterProps> = ({
    filter,
    setFilter,
    isAnimatable,
    toggleAnimation,
    hideTimeTitle
  }) => (
    <TimeRangeSlider
      {...timeRangeSliderFieldsSelector(filter)}
      onChange={setFilter}
      toggleAnimation={toggleAnimation}
      isAnimatable={isAnimatable}
      hideTimeTitle={hideTimeTitle}
    />
  );

  return TimeRangeFilter;
}

export default TimeRangeFilterFactory;