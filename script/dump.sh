#!/usr/bin/env zsh

tshark -r ./capture/fah.pcapng -T fields -E separator=, -E quote=d -E header=y -e _ws.col.No. -e _ws.col.Time -e _ws.col.Source -e _ws.col.Destination -e _ws.col.Length -e _ws.col.Info -e data
