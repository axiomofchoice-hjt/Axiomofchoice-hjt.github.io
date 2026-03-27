---
title: Codeforces 1323 div2 题解 (ABCD)
date: 2020-03-08 07:53:00
permalink: /pages/c86cf2/
categories:
  - 算法竞赛记录
description: 无
feed: false
---

[[toc]]

[比赛链接](https://codeforces.com/contest/1323/)

日常记录自己的菜鸡行径。

虽然我打的是 div1，但是我深刻认识到我水平其实只有 div2 的（确信），不然我也不会狂掉 101 分。

## A. Even Subset Sum Problem

签到题，略。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=1000010;
vector<int> a[2];
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    int t=read();
    while(t--){
        a[0].clear();
        a[1].clear();
        int n=read();
        repeat(i,1,n+1){
            int x=read()%2;
            a[x].push_back(i);
        }
        if(!a[0].empty())cout<<1<<endl<<a[0][0]<<endl;
        else if(a[1].size()>1)cout<<2<<endl<<a[1][0]<<' '<<a[1][1]<<endl;
        else cout<<-1<<endl;
    }
    return 0;
}
```

## B. Count Subrectangles

（~~这题居然在 B 题位置~~）

首先要统计一下序列 `a` 和 `b` 的所有连续 `1` 区间长度，记 `A_i` 为 `a` 序列第 `i` 个连续 `1` 的区间长度，`B_i` 类似。

考虑 `k` 的一个约数 `d`，那么 `d×k/d` 矩形的个数就是大于 `0` 的 `(A_i-d+1)` 之和乘以大于 `0` 的 `(B_i-k/d+1)` 之和，记这个数为 `cnt(d)`。

最终答案就是所有的 `cnt(d)` 加起来，即 `∑_{d|k}cnt(d)`。

加速的话可以将 `A_i` 和 `B_i` 排个序后求前缀和，用上 `lower_bound`。

总时间复杂度大概 `O(√(nm)log(nm))`。

更：根本不用前缀和，我发现去掉前缀和复杂度没什么变化，所以只要 `lower_bound` 就行了。

再更：连 `lower_bound` 都不用也过了，~~虽然我有点没看懂~~。

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=40010;
vector<int> divisor;
int a[N],b[N],a_sum[N],b_sum[N]; //这个a,b实际上是题解中的A,B
void get_divisor(int n){ //求出所有约数，这是我研究出来（大雾）的数论分块求法
    for(int i=1;i<n;i=n/(n/(i+1)))
    if(n%i==0)
        divisor.push_back(i);
    divisor.push_back(n);
}
int input(int a[],int a_sum[],int n){ //读入、排序、计算前缀和
    int len=0,cnt=0;
    a[cnt++]=0;
    repeat(i,0,n){
        if(read())len++;
        else if(cnt>0)a[cnt++]=len,len=0;
    }
    if(len>0)a[cnt++]=len;
    sort(a,a+cnt);
    repeat(i,1,cnt)a_sum[i]=a_sum[i-1]+a[i];
    return cnt;
}
ll count(int a[],int a_sum[],int n,int d){ //计算所有大于0的(ai-d+1)之和
    int p=lower_bound(a,a+n,d)-a;
    ll ans=a_sum[n-1]-a_sum[p-1]-(n-p)*(d-1);
    return ans;
}
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    int n=read(),m=read();
    ll k=read(); get_divisor(k);
    n=input(a,a_sum,n); m=input(b,b_sum,m);
    ll ans=0;
    for(auto d:divisor){
        ans+=count(a,a_sum,n,d)*count(b,b_sum,m,k/d);
    }
    cout<<ans<<endl;
    return 0;
}
```

## C. Unusual Competitions

div1 签到题。

括号序列的一种常见处理方式是把 `'('` 看作 `1`，把 `')'` 看作 `-1`，然后求前缀和。

这时候前缀和小于 `0` 的区间（再加上区间之后的那个位置）就是需要重排的区间，把区间长度 `+1` 计入答案中。

比如样例中的 `))((())(` 有：

|              |  )   |  )   |  (   |  (   |  (   |  )   |  )   |  (   |
| :----------: | :--: | :--: | :--: | :--: | :--: | :--: | :--: | :--: |
| 括号对应的值 |  -1  |  -1  |  1   |  1   |  1   |  -1  |  -1  |  1   |
|    前缀和    |  -1  |  -2  |  -1  |  0   |  1   |  0   |  -1  |  0   |
|  是否要重排  |  √   |  √   |  √   |  √   |  ×   |  ×   |  √   |  √   |

（如果前缀和最后一个位置不是 0 直接输出 -1 就行了。）

```cpp
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
const int N=1000010;
string s;
int H[N],*h=H+1,n,ans=0;
signed main(){
    ios_base::sync_with_stdio(0); cin.tie(0);
    cin>>n>>s;
    repeat(i,0,n){
        h[i]=h[i-1]+(s[i]=='(')*2-1;
    }
    if(h[n-1]!=0)cout<<-1<<endl,exit(0);
    repeat(i,0,n)ans+=(h[i]<0)+(h[i]<0 && h[i-1]>=0);
    cout<<ans<<endl;
    return 0;
}
```

## D. Present

div1 的第二题，我成功被难住。

更：只能说这种题目做太少了，题解思路很牛逼，~~菜是原罪~~。

我们分析答案的每一位，如果答案的第 `i` 位是 `1`，这意味着有奇数个 `(j,k)` 满足 `a_j+a_k` 的第 `i` 位是 `1`。

首先我们要砍掉高于 `i` 位的信息（这对答案不产生影响），即让 `b[j]=a[j]%(1<<(i+1))`（好处是这些数字两两之和被限制得很小），于是第 `i` 位是 `1` 的 `b_j+b_k` 的值只能在区间 `[2^i,2^{i+1}-1]∪[2^{i+1}+2^i,2^{i+2}-1]` 中。

这时如果固定 `j` 的值，`b_k` 的值的区间就是 `[2^i-b_j,2^{i+1}-1-b_j]∪[2^{i+1}+2^i-b_j,2^{i+2}-1-b_j]`，因此能在排序后用 `lower_bound` 快速计算满足 `b_j+b_k` 的第 `i` 位是 `1` 的 `k` 的个数。

复杂度是 `O(n log n log C)`。

题解里留了个问题：Can you do it in `O(n log C)`?

不会，告辞！（有思路的可以告诉我 orz）

说明一下其他题解里的 `[...]∪[...,2^{i+2}-2]` 和 `[...]∪[...,2^{i+2}-1]` 是没区别的，因为最大只能是 `2^{i+2}-2`。

```cpp
//代码大部分复制于%%%lzj
#include <bits/stdc++.h>
using namespace std;
#define repeat(i,a,b) for(int i=(a),_=(b);i<_;i++)
#define repeat_back(i,a,b) for(int i=(b)-1,_=(a);i>=_;i--)
typedef long long ll; ll read(){ll x; if(scanf("%lld",&x)==-1)exit(0); return x;}
const int N=400010;
int a[N],b[N];
signed main(){
    int n=read();
    repeat(i,0,n)a[i]=read();
    int ans=0;
    repeat(i,0,26){ //答案一定小于1<<26
        int mod=1<<(i+1);
        repeat(j,0,n)b[j]=a[j]%mod;
        int s=0;
        sort(b,b+n); //排序方便二分查找
        repeat(j,0,n){
            int l,r;
            l=lower_bound(b,b+n,(1<<i)-b[j])-b;
            r=lower_bound(b,b+n,(1<<(i+1))-b[j])-b-1;
            s+=(r-l+1); //统计2^i到2^(i+1)-1区间内的解
            l=lower_bound(b,b+n,(1<<i)+(1<<(i+1))-b[j])-b;
            r=lower_bound(b,b+n,(1<<(i+2))-b[j])-b-1;
            s+=(r-l+1); //统计2^(i+1)+2^i到2^(i+2)-1区间内的解
            if((b[j]+b[j])&(1<<i))s--; //自己和自己相加的不算
        }
        if((s/2)&1)ans+=1<<i; //小于j和大于j的都记录了所以个数要除以2
    }
    cout<<ans<<endl;
    return 0;
}
```
