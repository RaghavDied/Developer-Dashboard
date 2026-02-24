Developer Dashboard

A modern, interactive developer dashboard designed to centralize productivity tools, real-time data, and personal development metrics into a single cohesive interface.

This project demonstrates practical frontend engineering through API integration, state persistence, dynamic UI behavior, and refined user experience design.

Overview

The Developer Dashboard is built as a modular, extensible web application that integrates developer-centric tools within a visually polished interface.

It is not simply a UI showcase — it reflects structured JavaScript architecture, thoughtful UI layering, and real-world debugging decisions.

Core Features
GitHub Integration

Fetches live profile data using the GitHub REST API

Displays avatar, bio, repository count, followers, and recent repositories

Automatically updates based on account activity

LeetCode Statistics

Embedded dynamic stats card

Displays problem-solving activity and heatmap

Goals Tracker

Add, complete, and delete goals

Persistent storage using LocalStorage

Visual progress indicator with completion tracking

Smooth interaction animations

Weather Widget

Real-time weather data via OpenWeather API

Displays temperature, condition, humidity, and wind speed

Animated result transitions

Quote Generator

Curated developer quotes

Smooth fade transitions

Theme System

Light and Dark mode support

Theme persistence across sessions

Particle background dynamically adapts to theme

UI & Interaction Enhancements

Animated particle background (tsParticles)

Scroll reveal animations using Intersection Observer

Typing animation header

Glassmorphism card styling

Subtle micro-interactions and hover effects

Tech Stack
Frontend

HTML5

CSS3 (Custom Properties, Grid, Animations, Glassmorphism)

Vanilla JavaScript (ES6+)

APIs & Services

GitHub REST API

OpenWeather API

LeetCode Stats Card Service

tsParticles

Storage

Browser LocalStorage

Architectural Approach

This project emphasizes:

Clean DOM manipulation patterns

Modular function structuring

Persistent client-side state management

Layered UI stacking control

Animation performance awareness

Minimal dependency footprint

Special attention was given to debugging stacking contexts, pointer event handling, and dynamic component rendering — common real-world frontend challenges.
