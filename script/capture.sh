#!/usr/bin/env zsh

tshark -i lo0 -f "tcp port 36330" -w ./capture/fah.pcapng
